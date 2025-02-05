# # Build Stage
# FROM node:20.18.0 as build

# # Set working directory
# WORKDIR /app

# # Copy package files (Ensure package.json and package-lock.json are in the same directory as Dockerfile)
# COPY package.json package-lock.json ./

# # Install dependencies for building the React app
# RUN npm install

# # Copy all project files (including React source code)
# COPY . .

# # Build the React app
# RUN npm run build

# # Serve Stage (Using Node.js)
# FROM node:20.18.0

# # Set working directory
# WORKDIR /app

# # Copy the entire project files from the build stage (including public/ and src/)
# COPY --from=build /app /app

# # Install dependencies for running the React development server
# RUN npm install

# # Expose port (React development server runs on port 3000)
# EXPOSE 3000

# # Start React development server
# CMD ["npm", "start"]


# Build Stage
FROM node:20.18.0 AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the React app
RUN npm run build

# Serve Stage (Using Node.js)
FROM node:20.18.0

# Set working directory
WORKDIR /app

# Copy necessary files from the build stage
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/src ./src

# Install production dependencies
RUN npm install --production

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
