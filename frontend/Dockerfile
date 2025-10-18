# Stage 1: Build the React app
# This stage uses Node.js to install dependencies and create the static build files.
FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

# Stage 2: Serve the app with Nginx
# This stage takes the static files from Stage 1 and serves them using a lightweight Nginx web server.
FROM nginx:stable-alpine

# Copy the build output from the 'build' stage
COPY --from=build /app/build /usr/share/nginx/html

# Nginx will automatically use the files in /usr/share/nginx/html
# and start the server when the container runs.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]