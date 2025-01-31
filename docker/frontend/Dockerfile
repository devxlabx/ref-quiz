# Step 1: Use a Node.js base image to build the app
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Build the React app
RUN npm run build

# Step 2: Use a lightweight server to serve the built files
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
