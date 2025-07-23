# Stage 1: build
FROM node:20 AS builder

WORKDIR /app

COPY . .

# Hapus dan install ulang node_modules
RUN rm -rf node_modules package-lock.json && npm install
RUN npm run build

# Stage 2: production
FROM node:20

WORKDIR /app

COPY --from=builder /app .

ENV PORT=3000
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
