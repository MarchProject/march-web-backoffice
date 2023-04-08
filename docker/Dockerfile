FROM node:16-alpine 

RUN npm install -g pnpm

WORKDIR /app

# COPY ["package.json", "pnpm-lock.yaml", "./"]

COPY . .
RUN pnpm install

RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "prod"]
