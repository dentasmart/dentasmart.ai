# ============================================================
# DentaSmart — Multi-stage production Dockerfile
# ============================================================

# --- Build stage ---
FROM node:22-alpine AS build

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

WORKDIR /app

# Copy dependency manifests first (better layer caching)
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Run production build (vite + esbuild + prerender)
RUN pnpm build

# --- Runtime stage ---
FROM node:22-alpine AS runtime

# Install pnpm for production install
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy dependency manifests
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built output from build stage
COPY --from=build /app/dist ./dist

# Copy server source (needed for runtime imports not bundled by esbuild)
COPY --from=build /app/server ./server

# Copy shared directory
COPY --from=build /app/shared ./shared

# Copy drizzle migrations
COPY --from=build /app/drizzle ./drizzle

# Switch to non-root user
USER appuser

# Expose production port
EXPOSE 3000

# Start the application
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
