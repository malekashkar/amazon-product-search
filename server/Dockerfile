# clone the official docker container that has nodejs v12 and debian buster
FROM node:12-buster

# set this image's maintainer
LABEL MAINTAINER = 'Deposit <deposit@pokecord.xyz>'

# set workspace directory
WORKDIR /app

# copy the server directory to the workspace directory
COPY . ./

# install dependencies
RUN yarn

# set the main command that will be ran
CMD ["node", "index.js"]
