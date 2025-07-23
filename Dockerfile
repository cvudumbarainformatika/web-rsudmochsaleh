# --- Tahap Build ---
FROM node:20-bookworm AS builder

# Aktifkan corepack agar bisa pakai yarn modern
RUN corepack enable

WORKDIR /app

# Salin file proyek
COPY . .

# Hapus cache dan file lock lama
RUN rm -rf node_modules package-lock.json && \
    yarn install --network-timeout 300000 && \
    yarn build:ssr

# --- Tahap Production ---
FROM node:20-bookworm

WORKDIR /app

# Aktifkan corepack juga di stage production (optional tapi aman)
RUN corepack enable

# Salin hasil build SSR dari stage builder
COPY --from=builder /app/dist/ssr ./dist/ssr

# Salin juga file lock Yarn jika perlu
COPY --from=builder /app/yarn.lock ./dist/ssr/yarn.lock

WORKDIR /app/dist/ssr

# Install hanya production deps
RUN yarn install --production --network-timeout 300000

# Konfigurasi ENV & port
ENV PORT=39001
EXPOSE 39001

# Jalankan server SSR
CMD ["node", "index.js"]
