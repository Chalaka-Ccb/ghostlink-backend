# 1. Use the official Node.js image (Lightweight version)
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files first (for better caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the code
COPY . .

# 6. Expose the port the app runs on
EXPOSE 5000

# 7. Command to start the app
CMD ["npm", "start"]