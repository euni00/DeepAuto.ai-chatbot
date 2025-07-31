FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

ENV NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

COPY . .
RUN pnpm run build

FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000

RUN npm install -g pnpm
CMD ["pnpm", "start"]