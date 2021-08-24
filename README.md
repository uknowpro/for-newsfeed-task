# 뉴스피드 기능 구현을 위한 Backend for frontend 개발

뉴스피드는 학생들에게 학교에서 관리되는 페이지들에서 발행된 소식들을 볼 수 있는 서비스입니다. 이 서비스를 제공하기 위해, 뉴스피드 BFF에서는 REST API기반의 백엔드 서비스를 제공합니다.

뉴스피드 BFF는 nest.js를 기반으로 동작하며, node.js 환경에서 구동되는 어플리케이션입니다. 본 어플리케이션을 로컬 환경에서 구동하고자 한다면, 아래의 가이드를 참고하시기 바랍니다.

## 구동 환경
본 어플리케이션은 아래와 같은 환경에서 정상적으로 동작하였습니다.

| 구분                   | 값               |
|:-----------------------|:-----------------|
| `OS`                 | Ubuntu 18.04 LTS 64-bit |
| `Docker`                 | 20.10.7 |
| `Docker-compose`                 | 1.17.1 |
| `DB`                 | MongoDB 4.2.3 |
| `Node.js`                 | 14.17.5  |
| `Nest.js`                 | 8.1.1  |
| `Newman`                 | 5.2.4 |

### 사전 설치
**아래의 스크립트는 위 구동 환경 준비를 위해, 참고용입니다.**
```
$ sudo apt update
$ sudo apt install npm
$ sudo apt install docker.io
$ sudo apt install docker-compose
$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
$ sudo apt install -y nodejs
$ sudo npm install -g @nestjs/cli
$ sudo npm install pm2 -g
$ sudo npm install newman
```

## 구동 방법
**로컬 환경에서 newsfeed BFF를 구동하기전에, 반드시 MongoDB를 설치 및 실행해야 합니다.**
### MongoDB 실행
```
$ makefile -f Makefile-local.mk infra
```

### newsfeed BFF 설치 및 실행
```
$ makefile -f Makefile-local.mk service
```
```
> root@ bootstrap /home/yunho0520/for-newsfeed-task
> lerna bootstrap --hoist -- --no-optional

lerna notice cli v4.0.0
lerna info Bootstrapping 4 packages
lerna WARN EHOIST_ROOT_VERSION The repository root depends on @nestjs/axios@0.0.1, which differs from the more common @nestjs/axios@^0.0.1.
lerna WARN EHOIST_PKG_VERSION "@newsfeed/app" package depends on @nestjs/axios@^0.0.1, which differs from the hoisted @nestjs/axios@0.0.1.
lerna WARN EHOIST_PKG_VERSION "@newsfeed/common" package depends on @nestjs/axios@^0.0.1, which differs from the hoisted @nestjs/axios@0.0.1.
lerna WARN EHOIST_PKG_VERSION "@newsfeed/page" package depends on @nestjs/axios@^0.0.1, which differs from the hoisted @nestjs/axios@0.0.1.
lerna WARN EHOIST_PKG_VERSION "@newsfeed/student" package depends on @nestjs/axios@^0.0.1, which differs from the hoisted @nestjs/axios@0.0.1.
lerna WARN EHOIST_ROOT_VERSION The repository root depends on uuid@^8.3.2, which differs from the more common uuid@^3.4.0.
lerna WARN EHOIST_PKG_VERSION "@newsfeed/page" package depends on uuid@^3.4.0, which differs from the hoisted uuid@^8.3.2.
lerna WARN EHOIST_PKG_VERSION "@newsfeed/student" package depends on uuid@^3.4.0, which differs from the hoisted uuid@^8.3.2.
lerna info Installing external dependencies
lerna info hoist Installing hoisted dependencies into root
lerna info hoist Pruning hoisted dependencies
lerna info hoist Finished pruning hoisted dependencies
lerna info hoist Finished bootstrapping root
lerna info Symlinking packages and binaries
lerna success Bootstrapped 4 packages

> root@ build /home/yunho0520/for-newsfeed-task
> lerna run build

lerna notice cli v4.0.0
lerna info Executing command in 4 packages: "npm run build"
lerna info run Ran npm script 'build' in '@newsfeed/common' in 10.4s:

> @newsfeed/common@0.0.1 prebuild /home/yunho0520/for-newsfeed-task/newsfeed-bff/common
> rimraf dist


> @newsfeed/common@0.0.1 build /home/yunho0520/for-newsfeed-task/newsfeed-bff/common
> nest build

lerna info run Ran npm script 'build' in '@newsfeed/student' in 14.1s:

> @newsfeed/student@0.0.1 prebuild /home/yunho0520/for-newsfeed-task/newsfeed-bff/student
> rimraf dist


> @newsfeed/student@0.0.1 build /home/yunho0520/for-newsfeed-task/newsfeed-bff/student
> nest build

lerna info run Ran npm script 'build' in '@newsfeed/page' in 14.5s:

> @newsfeed/page@0.0.1 prebuild /home/yunho0520/for-newsfeed-task/newsfeed-bff/page
> rimraf dist


> @newsfeed/page@0.0.1 build /home/yunho0520/for-newsfeed-task/newsfeed-bff/page
> nest build

lerna info run Ran npm script 'build' in '@newsfeed/app' in 10.0s:

> @newsfeed/app@0.0.0 prebuild /home/yunho0520/for-newsfeed-task/newsfeed-bff/app
> rimraf dist


> @newsfeed/app@0.0.0 build /home/yunho0520/for-newsfeed-task/newsfeed-bff/app
> nest build

lerna success run Ran npm script 'build' in 4 packages in 34.8s:
lerna success - @newsfeed/app
lerna success - @newsfeed/common
lerna success - @newsfeed/page
lerna success - @newsfeed/student
[PM2] Starting /usr/bin/npm in fork_mode (1 instance)
[PM2] Done.
┌─────┬─────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name            │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼─────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ newsfeed-bff    │ default     │ N/A     │ fork    │ 9267     │ 0s     │ 0    │ online    │ 0%       │ 16.0mb   │ yun… │ disabled │
└─────┴─────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

## 테스트 실행
로컬 환경에서 테스트를 실행 하려면, 사전 설치 및 MongoDB 실행이 완료되어야 합니다.
```
$ makefile -f Makefile-local.mk test
```
### 테스트 결과 예시
