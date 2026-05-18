# DentaSmart — Environment Variables Reference

Copy the variables below into your `.env` file and fill in real values.
**NEVER commit `.env` with real secrets to version control.**

```env
# --- Server ---
NODE_ENV=production
PORT=3000

# --- Database (MySQL) ---
DATABASE_URL=mysql://dentasmart:your_password_here@db:3306/dentasmart
DB_USER=dentasmart
DB_PASSWORD=dentasmart_dev
DB_NAME=dentasmart
DB_ROOT_PASSWORD=rootpassword_dev
DB_PORT=3306

# --- Authentication / OAuth ---
JWT_SECRET=your-jwt-secret-here-min-32-chars
OAUTH_SERVER_URL=https://your-oauth-server.example.com
VITE_APP_ID=your-oauth-app-id
VITE_OAUTH_PORTAL_URL=https://your-oauth-portal.example.com/login

# --- Owner ---
OWNER_OPEN_ID=your-owner-open-id

# --- AI / Forge API (server-side) ---
BUILT_IN_FORGE_API_URL=https://your-forge-api.example.com
BUILT_IN_FORGE_API_KEY=your-forge-api-key-here

# --- AI / Forge API (frontend) ---
VITE_FRONTEND_FORGE_API_URL=https://your-forge-api.example.com
VITE_FRONTEND_FORGE_API_KEY=your-frontend-forge-api-key-here

# --- Analytics: Google Analytics 4 ---
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# --- Analytics: Umami ---
VITE_ANALYTICS_ENDPOINT=https://your-umami-instance.example.com
VITE_ANALYTICS_WEBSITE_ID=your-umami-website-id
```

## Variable Descriptions

| Variable | Description | Used In |
|---|---|---|
| `NODE_ENV` | Runtime environment (`production` or `development`) | Server |
| `PORT` | HTTP listen port (default: 3000) | Server |
| `DATABASE_URL` | MySQL connection string | Server (Drizzle ORM) |
| `DB_USER` | MySQL username (for docker-compose) | Docker |
| `DB_PASSWORD` | MySQL password (for docker-compose) | Docker |
| `DB_NAME` | MySQL database name (for docker-compose) | Docker |
| `DB_ROOT_PASSWORD` | MySQL root password (for docker-compose) | Docker |
| `DB_PORT` | Host-exposed MySQL port (for docker-compose) | Docker |
| `JWT_SECRET` | Secret for signing session cookies (min 32 chars) | Server |
| `OAUTH_SERVER_URL` | OAuth provider backend URL | Server |
| `VITE_APP_ID` | OAuth application ID | Client + Server |
| `VITE_OAUTH_PORTAL_URL` | OAuth login portal URL | Client |
| `OWNER_OPEN_ID` | Owner's OpenID identifier | Server |
| `BUILT_IN_FORGE_API_URL` | AI/LLM API endpoint (server-side) | Server |
| `BUILT_IN_FORGE_API_KEY` | AI/LLM API bearer token (server-side) | Server |
| `VITE_FRONTEND_FORGE_API_URL` | AI/LLM API endpoint (frontend) | Client |
| `VITE_FRONTEND_FORGE_API_KEY` | AI/LLM API bearer token (frontend) | Client |
| `VITE_GA4_MEASUREMENT_ID` | Google Analytics 4 measurement ID | Client (HTML template) |
| `VITE_ANALYTICS_ENDPOINT` | Umami analytics instance URL | Client (HTML template) |
| `VITE_ANALYTICS_WEBSITE_ID` | Umami website tracking ID | Client (HTML template) |
