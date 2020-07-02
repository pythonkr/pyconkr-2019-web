#!/bin/bash
set -x

if ! [ -z "API_SERVER" ]; then
    export PROVIDED_API_SERVER=$API_SERVER
fi

if [ -z "$DEPLOY_ENV" ]; then
    source ./envs/development.sh
else
    source ./envs/${DEPLOY_ENV}.sh
fi

if ! [ -z "PROVIDED_API_SERVER" ]; then
    export API_SERVER=$PROVIDED_API_SERVER
fi

yarn && yarn build
yarn start

