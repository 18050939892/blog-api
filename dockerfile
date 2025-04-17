FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 确保 node_modules/.bin 中的文件有执行权限
RUN chmod -R 755 ./node_modules/.bin/

RUN npm run build

CMD ["npm", "start"]
