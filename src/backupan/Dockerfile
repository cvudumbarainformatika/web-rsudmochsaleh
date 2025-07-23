# --- Tahap Build ---
FROM node:20-bookworm AS builder

WORKDIR /app

# Salin semua file proyek ke container
COPY . .

# Install dependencies + build SSR
RUN npm install --legacy-peer-deps && \
    npm run build:ssr

# --- Tahap Production ---
FROM node:20-bookworm

# Atur direktori kerja di container
WORKDIR /app

# Salin hasil build dari tahap builder
COPY --from=builder /app/dist/ssr ./dist/ssr

# (Opsional) Jika kamu ingin menyalin juga package.json yang dibuat otomatis oleh Quasar di dist/ssr
COPY --from=builder /app/dist/ssr/package.json ./dist/ssr/package.json

# Masuk ke folder SSR hasil build
WORKDIR /app/dist/ssr

# Install hanya dependency production di dalam folder build
RUN npm install --omit=dev --legacy-peer-deps

# ENV agar bisa disesuaikan
ENV PORT=39001
EXPOSE 39001

# Jalankan server SSR
CMD ["node", "index.js"]
