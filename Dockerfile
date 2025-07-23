# Stage 1: build
FROM node:20 AS builder

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

# Stage 2: production
FROM node:20

WORKDIR /app

COPY --from=builder /app .

ENV PORT=3000
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
