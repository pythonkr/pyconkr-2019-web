FROM node:11.10

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Set a working directory
WORKDIR /web

# Install native dependencies
# RUN set -ex; \
#   apk add --no-cache ...

# Install Node.js dependencies
COPY package.json yarn.lock ./
RUN set -ex; \
  if [ "$NODE_ENV" = "production" ]; then \
    yarn install --no-cache --frozen-lockfile --production; \
  elif [ "$NODE_ENV" = "test" ]; then \
    yarn install --no-cache --frozen-lockfile; \
  fi;

ENTRYPOINT ["./docker-entrypoint.sh"]
