# Stage 1: Build
FROM node:22.15.0-alpine3.20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:22.15.0-alpine3.20
WORKDIR /app
COPY --from=build /app/lib ./lib
COPY package*.json ./
RUN npm install --omit=dev
CMD ["node", "lib/index.js"]