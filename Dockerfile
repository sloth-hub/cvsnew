FROM node:18.13.0-alpine
FROM mcr.microsoft.com/playwright:focal

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# COPY . /app
COPY package.json package-lock.json ./
RUN npm install && npx playwright install --with-deps chromium

WORKDIR /app/client
RUN npm install --silent
RUN npx playwright install

WORKDIR /app/server
RUN npm install --silent

EXPOSE 3000

CMD ["npm", "run", "start"]