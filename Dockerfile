# Use a basic Node image
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Copy game files
COPY . .

# Install a simple HTTP server
RUN npm install -g http-server

# Expose the port
EXPOSE 8080

# Command to start the server
CMD ["http-server", "-p", "8080"]
