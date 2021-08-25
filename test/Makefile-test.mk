COLLECTIONS ?= \
	CASE_1_DEFAULT_TEST.postman_collection.json
	CASE_2_VALIDATION_TEST.postman_collection.json

test:
	@for collection in $(COLLECTIONS); do \
		newman run ./postman-collection/$$collection -e ./postman-collection/NEWSFEED_LOCAL.postman_environment.json --verbose --color on;
