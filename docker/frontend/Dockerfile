# Step 1: Use a Node.js base image to build the app
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Build the React app
RUN npm run build


