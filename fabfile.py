# -*- coding: utf-8 -*-
import os

from fabric import task

@task
def deploy(c, deploy_env='development', sha1='', port='3000'):
    target_dir = f'~/'
    web_dir = f'{target_dir}/pyconkr-web'
    git_url = 'https://github.com/pythonkr/pyconkr-web.git'

    c.run(f'mkdir -p {target_dir}')

    # 이전에 deploy dir을 clone한 적이 없다면 clone
    result = c.run(f'test -e {web_dir}', warn=True)
    if result.exited:
        print(f'{web_dir} is not exists')
        c.run(f'git clone {git_url} {web_dir}')

    with c.cd(web_dir):
        c.run('git fetch --all -p')
        if sha1:
            c.run(f'git reset --hard {sha1}')
        else:
            c.run(f'git reset --hard origin/{branch}')
        envs = [
            f'DEPLOY_ENV={deploy_env}',
            f'PORT={port}'
        ]
        c.run(f'docker-compose down | true')
        env_command = ' '.join(envs)
        compose_command = f'docker-compose up -d --build --force-recreate'
        c.run(f'{env_command} {compose_command}')
        print('finish')

@task
def deploy_dev(c, sha1='origin/develop'):
    deploy(c, deploy_env='development', sha1=sha1)

@task
def deploy_master(c, sha1='origin/master'):
    deploy(c, deploy_env='production', sha1=sha1)
