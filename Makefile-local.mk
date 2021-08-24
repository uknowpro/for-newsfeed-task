INFRA_DOCKER_COMPOSE_FILE ?= infra/docker-compose.yaml

DOCKER_NETWORK_NAME = newsfeed

network:
	@docker network inspect ${DOCKER_NETWORK_NAME} >/dev/null 2>&1 || docker network create $(DOCKER_NETWORK_NAME)

network-clean:
	@docker network rm ${DOCKER_NETWORK_NAME} >/dev/null 2>&1 || true

infra: network
	@LOCAL_NETWORK_NAME=${DOCKER_NETWORK_NAME} docker-compose -f ${INFRA_DOCKER_COMPOSE_FILE} up -d

infra-down:
	@docker-compose -f ${INFRA_DOCKER_COMPOSE_FILE} down

infra-clean:
	@docker-compose -f ${INFRA_DOCKER_COMPOSE_FILE} down --remove-orphans --rmi all 2>/dev/null

service-install:
	@npm install

service-build:
	@npm run bootstrap && npm run build

service-up: service-build
	@pm2 start --name newsfeed-bff  npm -- start

service-down:
	@pm2 delete 0

clean: service-down infra-clean network-clean

integrated-test: clean infra service
	@cd test && make -f Makefile-for-intgrated-test.mk test && cd -

.PHONY: clean network network-clean infra infra-down infra-clean service-up service-down integrated-test
