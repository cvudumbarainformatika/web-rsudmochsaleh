# ========== BUILD IMAGE ==========
FROM node:20-bookworm AS builder

WORKDIR /app

# Salin package file
COPY package*.json ./

# Install dependencies full (termasuk devDependencies)
RUN npm install --legacy-peer-deps

# Salin seluruh project
COPY . .

# Build SSR
RUN npm run build

# ========== RUNTIME IMAGE ==========
FROM node:20-bookworm AS runtime

WORKDIR /app

# Salin hanya dependency production saja
COPY package*.json ./
RUN npm install --only=production --legacy-peer-deps

# Salin hasil build dari stage builder
COPY --from=builder /app/dist/ssr ./

# Ganti port default jika diperlukan
ENV PORT=39001

# Jalankan SSR Quasar (bukan dev server)
CMD ["node", ".output/server/index.mjs"]
