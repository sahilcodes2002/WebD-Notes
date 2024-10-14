# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 to the host
EXPOSE 3000

# Command to run the application with Prisma commands
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && npm run dev"]
