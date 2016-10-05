IMAGE_NAME = worker

build:
	cp ../lib/* ./lib/
	docker build -t $(IMAGE_NAME) .

run:
	-docker rm -f $(IMAGE_NAME)
	-docker run -d --name $(IMAGE_NAME) \
	--link rabbit:rabbit \
	--link tarantool:tarantool \
	$(IMAGE_NAME)

bash:
	-docker exec -it $(IMAGE_NAME) bash
