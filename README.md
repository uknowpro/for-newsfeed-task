# 뉴스피드 기능 구현을 위한 Backend for frontend 개발

뉴스피드는 학생들이 학교 페이지들에서 발행된 소식들을 볼 수 있는 서비스입니다. 이 서비스를 제공하기 위해, 뉴스피드 BFF에서는 REST API기반의 백엔드 서비스를 제공합니다.

뉴스피드 BFF는 nest.js를 기반으로 동작하며, node.js 환경에서 구동되는 어플리케이션입니다. 본 어플리케이션을 로컬 환경에서 구동하고자 한다면, 아래의 가이드를 참고하시기 바랍니다.

## 구동 환경
본 어플리케이션은 아래와 같은 환경에서 정상적으로 동작하였습니다.

| 구분                   | 버전               |
|:-----------------------|:-----------------|
| `OS`                 | Ubuntu 18.04 LTS 64-bit |
| `Docker`                 | 20.10.7 |
| `Docker-compose`                 | 1.17.1 |
| `DB`                 | MongoDB 4.2.3 |
| `Node.js`                 | 14.17.5  |
| `Nest.js`                 | 8.1.1  |
| `Newman`                 | 5.2.4 |

### 사전 설치
**아래의 스크립트는 위 구동 환경 준비를 위한, 참고용입니다.**
```
$ sudo apt update
$ sudo apt install npm
$ sudo apt install docker.io
$ sudo apt install docker-compose
$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
$ sudo apt install -y nodejs
$ sudo npm install -g @nestjs/cli
$ sudo npm install -g pm2
$ sudo npm install -g newman
```

## 구동 방법
**로컬 환경에서 newsfeed BFF를 구동하기전에, 반드시 MongoDB를 설치 및 실행해야 합니다.**

### MongoDB 실행
**아래의 커맨드로 MongoDB를 실행하기 위해서는 non-root user로 도커를 관리할 수 있어야 합니다.**
참조: https://docs.docker.com/engine/install/linux-postinstall/
```
$ makefile -f Makefile-local.mk infra
```

### newsfeed BFF 설치 및 실행
```
$ makefile -f Makefile-local.mk service
```
```
lerna success run Ran npm script 'build' in 4 packages in 34.8s:
lerna success - @newsfeed/app
lerna success - @newsfeed/common
lerna success - @newsfeed/page
lerna success - @newsfeed/student
[PM2] Starting /usr/bin/npm in fork_mode (1 instance)
[PM2] Done.
┌─────┬─────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name            │ namespace   │ version │ mode    │ pid      │ uptime │ re   │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼─────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ newsfeed-bff    │ default     │ N/A     │ fork    │ 9267     │ 0s     │ 0    │ online    │ 0%       │ 16.0mb   │ yun…     │ disabled │
└─────┴─────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

## 테스트 실행
**로컬 환경에서 테스트를 실행 하려면, 사전 설치 및 MongoDB 실행이 완료되어야 합니다.**
**아래의 커맨드는 수행완료까지 테스트 환경에 따라 약 1~5분 가량 소요될 수 있습니다.**
```
$ makefile -f Makefile-local.mk test
```
### 테스트 결과 예시
```
CASE_1_DEFAULT_TEST
→ DEL /v1/students/{studentId}
  DELETE http://localhost:3000/v1/students/12345 [200 OK, 145B, 8ms]

  prepare   wait    dns-lookup   tcp-handshake   transfer-start   download   process   total
  1ms       229µs   (cache)      (cache)         5ms              1ms        28µs      8ms

  √  Status code is 200
  √  Response time is less than 400ms

┌─────────────────────────┬─────────────────────┬────────────────────┐
│                         │            executed │             failed │
├─────────────────────────┼─────────────────────┼────────────────────┤
│              iterations │                   1 │                  0 │
├─────────────────────────┼─────────────────────┼────────────────────┤
│                requests │                  17 │                  0 │
├─────────────────────────┼─────────────────────┼────────────────────┤
│            test-scripts │                  17 │                  0 │
├─────────────────────────┼─────────────────────┼────────────────────┤
│      prerequest-scripts │                   0 │                  0 │
├─────────────────────────┼─────────────────────┼────────────────────┤
│              assertions │                  51 │                  0 │
├─────────────────────────┴─────────────────────┴────────────────────┤
│ total run duration: 540ms                                          │
├────────────────────────────────────────────────────────────────────┤
│ total data received: 1.29KB (approx)                               │
├────────────────────────────────────────────────────────────────────┤
│ average response time: 6ms [min: 4ms, max: 20ms, s.d.: 3ms]        │
├────────────────────────────────────────────────────────────────────┤
│ average DNS lookup time: 927µs [min: 927µs, max: 927µs, s.d.: 0µs] │
├────────────────────────────────────────────────────────────────────┤
│ average first byte time: 3ms [min: 1ms, max: 5ms, s.d.: 1ms]       │
└────────────────────────────────────────────────────────────────────┘
```