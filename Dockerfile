FROM node:20-alpine
WORKDIR /srin_frontend
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 3000
CMD ["npm", "run","dev"]