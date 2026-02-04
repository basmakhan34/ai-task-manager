FROM node:20-slim

WORKDIR /app

# Dependency files copy karein
COPY package.json package-lock.json ./

# Dependencies install karein
RUN npm install --legacy-peer-deps

# Baqi sara code copy karein
COPY . .

# Port 3000 expose karein
EXPOSE 3000

# Build ke bajaye direct development mode mein chalayein
CMD ["npm", "run", "dev"]
