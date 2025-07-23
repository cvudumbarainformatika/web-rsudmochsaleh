# ========================
# Stage 1: Build
# ========================
FROM node:20-alpine AS builder

WORKDIR /app

# Salin semua file proyek
COPY . .

# Bersihkan node_modules dan lockfile agar fresh
RUN rm -rf node_modules package-lock.json && \
    npm install --legacy-peer-deps && \
    npm rebuild esbuild rollup && \
    npm run build:ssr

# ========================
# Stage 2: Runtime
# ========================
FROM node:20-alpine AS runtime

WORKDIR /app

# Salin package.json dan install dependencies production-only
COPY --from=builder /app/package*.json ./
RUN npm install --only=production --legacy-peer-deps

# Salin hasil build dari tahap builder
COPY --from=builder /app/.output ./.output

# SSR apps listening on port 3000 by default
ENV PORT=39001

EXPOSE 39001

CMD ["node", ".output/server/index.mjs"]
