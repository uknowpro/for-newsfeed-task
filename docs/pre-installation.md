### 기본 설치
```
$ sudo apt update
$ sudo apt install npm
$ sudo apt install docker.io
$ sudo apt install docker-compose
$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
$ sudo apt install -y nodejs
$ sudo npm install -g @nestjs/cli
$ sudo npm install pm2 -g
```

### Manage Docker as n non-root user
https://docs.docker.com/engine/install/linux-postinstall/


### nest.js 프로젝트 생성
```
$ mkdir for-newsfeed-task
$ cd /for-newsfeed-task
$ lerna init
$ cd ..
$ lerna create app
$ lerna create common
$ lerna create service
```

### 구동
```
$ sudo npm run install
$ sudo npm run bootstrap
$ sudo npm run build
$ pm2 start --name newsfeed-bff  npm -- start
```

### 중지
```
$ pm2 delete 0
```
