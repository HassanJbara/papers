# Use an official Node.js runtime as the base image
FROM node:21-alpine

# set environment variables
ENV PORT 80
# vite uses variables during build time
ARG VITE_BACKEND_URL
ARG VITE_FRONTEND_USERNAME
ARG VITE_FRONTEND_PASSWORD

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port that the app will run on
EXPOSE $PORT

# Define the command to run the app
CMD ["npm", "start"]
