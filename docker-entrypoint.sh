#!/bin/bash
set -x

if [ -z "$DEPLOY_ENV" ]; then
    source ./envs/development.sh
else
    source ./envs/${DEPLOY_ENV}.sh
fi

yarn && yarn build
yarn start
