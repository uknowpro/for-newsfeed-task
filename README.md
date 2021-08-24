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
$ makefile -f Makefile-local.mk servicce
```

## 테스트 실행
로컬 환경에서 테스트를 실행 하려면, 사전 설치 및 MongoDB 실행이 완료되어야 합니다.
```
$ makefile -f Makefile-local.mk test
```
### 테스트 결과 예시
