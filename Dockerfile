#FROM node:14-alpine  #с 14-ым нет ошибок soket-timeout
FROM node:16-alpine
ENV NODE_ENV=production

WORKDIR /app
COPY . .


#RUN npm install --global nx@latest
#COPY ["package.json", "./"]
#RUN npm ci
#+RUN npm install
#COPY . .
#RUN npm run build

# RUN node -v
# RUN npm config set fetch-retries 5
# RUN npm config set fetch-retry-factor 20
# RUN npm config set fetch-retry-mintimeout 20000
# RUN npm config set fetch-retry-maxtimeout 320000
# RUN npm config set fetch-timeout 600000

#RUN npm i -g yarn@latest
#RUN yarn

RUN yarn global add nx@latest
RUN yarn global add  @nrwl/cli
#RUN yarn install

#RUN npm install --global nx@latest
#RUN npm install -g @nrwl/cli

#EXPOSE 3001
#+RUN chown -R node /app
#+USER node
CMD ["npm", "start"]
