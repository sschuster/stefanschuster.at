FROM node:10

ENV NODE_ENV production

COPY --chown=node:node main.js /home/node/stefanschuster.at/
COPY --chown=node:node package.json /home/node/stefanschuster.at/
COPY --chown=node:node package-lock.json /home/node/stefanschuster.at/
COPY --chown=node:node src /home/node/stefanschuster.at/src/

USER node
WORKDIR /home/node/stefanschuster.at/

RUN npm install

EXPOSE 3000
CMD node main.js