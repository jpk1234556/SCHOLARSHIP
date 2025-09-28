FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production && npm cache clean --force
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
