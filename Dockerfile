# =======================
# Tahap 1: Builder
# =======================
FROM node:20 AS builder

WORKDIR /app

# Salin dan install dependensi
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Salin semua file proyek
COPY . .

# Build untuk SSR
RUN npm run build:ssr

# =======================
# Tahap 2: Runtime
# =======================
FROM node:20-alpine AS runtime

WORKDIR /app

# Salin package.json dan install prod-deps saja
COPY --from=builder /app/package*.json ./
RUN npm install --only=production --legacy-peer-deps

# Salin hasil build SSR
COPY --from=builder /app/.output ./.output

# Set environment variable
ENV PORT=39001

# Jalankan server SSR
CMD ["node", ".output/server/index.mjs"]
