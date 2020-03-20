# Create base
FROM node:lts-alpine AS base
WORKDIR /app

# Copy all files
COPY . .

# Install react app dependencies
RUN npm install --only=prod

# Build react app, output location: dist/
RUN npm run build-prod

# Expose port 80
EXPOSE 80

# Start server
CMD [ "npm", "start" ]