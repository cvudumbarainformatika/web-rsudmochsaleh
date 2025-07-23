# Tahap 1: Build dengan Node
FROM node:20-alpine AS builder

# Install dependensi tambahan
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Salin file penting terlebih dahulu agar cache efisien
COPY package*.json ./

# Install dependency TANPA optional & legacy peer deps
RUN npm install --omit=optional --legacy-peer-deps

# Salin semua source code
COPY . .

# Build SSR
RUN npx quasar build -m ssr


# Tahap 2: Jalankan hasil build
FROM node:20-alpine

WORKDIR /app

# Copy output dari tahap builder
COPY --from=builder /app/.output /app

# Install hanya dependencies runtime
RUN npm install --omit=dev --omit=optional --legacy-peer-deps || true

# Pakai port sesuai kebutuhan
ENV PORT=39001
EXPOSE 39001

# Jalankan SSR server
CMD ["node", "server/index.mjs"]
