# ========== RUNTIME IMAGE ==========
FROM node:20-bookworm AS runtime

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production --legacy-peer-deps

# ✅ Salin hasil build ke lokasi yang benar
COPY --from=builder /app/dist/ssr ./dist/ssr

# ✅ Default port dari quasar.conf.js atau ENV sendiri
ENV PORT=39001

# ✅ Jalankan dari file output default Quasar CLI
CMD ["node", "dist/ssr/index.js"]
