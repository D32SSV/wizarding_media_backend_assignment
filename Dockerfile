FROM node:18.0

WORKDIR /usr/src/app 

COPY package*.json ./

RUN npm install
RUN npm install cors --save

COPY . .

CMD ["npm", "start"]
