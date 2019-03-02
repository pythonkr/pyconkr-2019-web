#!/bin/bash
set -x

if [ -z "$DEPLOY_ENV" ]; then
    ./envs/development.sh
else
    ./envs/${DEPLOY_ENV}.sh
fi

yarn && yarn build
yarn start

