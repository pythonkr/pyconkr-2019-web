# -*- coding: utf-8 -*-
import os

from fabric import task

@task
def deploy(c, branch='develop', sha1=''):
    target_dir = f'~/pyconkr.kr'

    deploy_env = 'development'
    if branch == 'develop':
        target_dir = f'~/dev.pyconkr.kr'
    elif branch == 'master':
        target_dir = f'~/www.pyconkr.kr'
        deploy_env = 'production'

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
        ]
        c.run(f'docker-compose down | true')
        env_command = ' '.join(envs)
        compose_command = f'docker-compose up -d --build --force-recreate'
        c.run(f'{env_command} {compose_command}')
        print('finish')
