# clone the official docker container that has nodejs v12 and debian buster
FROM node:12-buster

# set this image's maintainer
LABEL MAINTAINER = 'Deposit <deposit@pokecord.xyz>'

# install the required software
RUN apt install -y make gcc g++ python git

# set workspace directory
WORKDIR /app

# copy the server directory to the workspace directory
COPY server ./

# install dependencies
RUN yarn
# remove the additional installed software
RUN apt remove -y --purge make gcc g++ python git

# set the main command that will be ran
CMD ["node", "index.js"]