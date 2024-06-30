# PyCon Korea Web

[![CircleCI](https://circleci.com/gh/pythonkr/pyconkr-web.svg?style=svg)](https://circleci.com/gh/pythonkr/pyconkr-web)

This app is using [Next.js](https://nextjs.org/)

## Development Package Requirements (Mac)
1. Install Homebrew (https://brew.sh/)
2. Install Yarn (https://yarnpkg.com/lang/en/docs/install/)
3. Install nvm (https://github.com/creationix/nvm#install-script)
4. Install node (On Terminal)

```
$ nvm install node
$ nvm ls
$ nvm use <node_version>
```

## Running the app (Develop Environment)
`yarn && yarn dev`

## move to prod

I made builded docker file for prod


```
docker build -f DockerfileProd -t {AWS_ID}.dkr.ecr.ap-northeast-2.amazonaws.com/{CLUSTER_NAME}/{APP_ID}:2024_prod_frozen .
```
