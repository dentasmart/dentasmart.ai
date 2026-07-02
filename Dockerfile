# Stage 1 — deps
# Install ALL dependencies (dev + prod) so the build tools are available.

FROM node:22-alpine AS deps

# Install pnpm via corepack (matches the version declared in package.json)
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

WORKDIR /app

# Copy manifests and patches first for layer-cache efficiency
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Install all deps (including devDeps needed for the build)
RUN pnpm install --frozen-lockfile


# Stage 2 — build
# Compile the Vite frontend and esbuild server bundle.
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

WORKDIR /app

# Bring in installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the full source tree
COPY . .

# Build: vite build (frontend → dist/public) + esbuild (server → dist/index.js)
# NODE_ENV=production ensures Vite builds in production mode
RUN NODE_ENV=production pnpm build


# Stage 3 — runtime
# Lean image: only production deps + built artefacts.
FROM node:22-alpine AS runtime

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy manifests, patches, and install ONLY production dependencies
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile --prod

# Copy the built artefacts from the builder stage
COPY --from=builder /app/dist ./dist

# Copy drizzle schema/migrations (needed at runtime for db:push if ever run)
COPY --from=builder /app/drizzle ./drizzle

# Copy environment file for runtime configuration
COPY .env ./.env

# Switch to non-root user
USER appuser

# The server reads PORT from the environment; default is 3000
EXPOSE 3000

ENV NODE_ENV=production

# Healthcheck — Express serves / with a 200 once the app is ready
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:${PORT:-3000}/ || exit 1

# Start the pre-built server bundle directly (no pnpm, no prestart rebuild)
CMD ["node", "dist/index.js"]
