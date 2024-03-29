# syntax=docker/dockerfile:1
# Development mode
FROM node:16-bullseye

#ports
EXPOSE 5000/tcp
EXPOSE 5000/udp

# Args
ARG NODE_ENV=development
ARG BACKEND_WORKING_DIR=usr/backend

# Envs
ENV NODE_ENV=${NODE_ENV}
ENV BACKEND_WORKING_DIR=${BACKEND_WORKING_DIR}

# Create folder and copy package.json
RUN mkdir -p /$BACKEND_WORKING_DIR;
WORKDIR /$BACKEND_WORKING_DIR
COPY ./package.json .

# Update npm | Install pnpm | Set PNPM_HOME | Install global packages
RUN npm i -g npm@latest; \
 # Install pnpm
 npm install -g pnpm; \
 pnpm --version; \
 pnpm setup; \
 mkdir -p /usr/local/share/pnpm &&\
 export PNPM_HOME="/usr/local/share/pnpm" &&\
 export PATH="$PNPM_HOME:$PATH"; \
 pnpm bin -g &&\
 # Install dependencies
 pnpm add -g pm2 &&\
 pnpm add -g @nestjs/cli &&\
 pnpm install

# Copy app files
COPY . .

# Build
RUN pnpm run build

# run command
CMD ["node", "dist/main.js"]