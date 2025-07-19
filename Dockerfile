# 1. Base image
FROM node:20-alpine

# 2. Create app directory
WORKDIR /usr/src/app

# 3. Copy package files and install dependencies
COPY package*.json ./
COPY yarn.lock ./

# Install all dependencies including devDependencies
RUN yarn install

# 4. Copy the rest of your app source code
COPY . .

# 5. Run the app using ts-node-dev
CMD ["yarn", "start:dev"]
