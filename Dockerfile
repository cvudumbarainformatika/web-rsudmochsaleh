# ========== 1. Base builder ================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Bersihkan dan install dengan legacy-peer-deps agar tidak error
RUN rm -rf node_modules package-lock.json && \
    npm install --legacy-peer-deps

# Copy semua file dan build SSR
COPY . .

# Build SSR (client + server)
RUN npm run build:ssr


# ========== 2. Final runtime ===============
FROM node:22-alpine AS runtime

WORKDIR /app

# Install production dependencies only
COPY --from=builder /app/package*.json ./
RUN npm install --only=production --legacy-peer-deps

# Copy hasil build dari builder
COPY --from=builder /app/.output ./.output

# Ganti port sesuai permintaan
ENV PORT=39001

# Jalankan Quasar SSR
CMD ["node", ".output/server/index.mjs"]
