### 기본 설치
$ sudo apt update
$ sudo apt install npm
$ sudo apt install docker.io
$ sudo apt install docker-compose
$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
$ sudo apt install -y nodejs
$ sudo npm i -g @nestjs/cli
$ sudo npm install pm2 -g
$ sudo npm install --save @nestjs/swagger swagger-ui-express

### nest.js 프로젝트 생성
$ mkdir for-classing-task
$ cd /for-classing-task
$ nest new newsfeed-bff

### 구동
$ sudo npm run build
$ pm2 start --name newsfeed-bff  npm -- start

### 중지
$ pm2 delete 0
