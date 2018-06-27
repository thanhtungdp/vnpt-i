FROM node:boron

# Install yarrn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

WORKDIR /usr/src/app

# install package
COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn run build
RUN rm -r src

EXPOSE 5555
CMD [ "yarn", "run", "start" ]
