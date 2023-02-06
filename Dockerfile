FROM node:16-alpine
WORKDIR /usr/nuxt/app
COPY . .
RUN npm install
RUN npm run build
CMD ["node", "./.output/server/index.mjs"]