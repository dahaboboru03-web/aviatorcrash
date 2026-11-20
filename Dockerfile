FROM node:22-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --no-audit --no-fund

COPY . .

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# data/ must live on a persistent Oracle block volume mounted at /app/data
CMD ["npm", "start"]
