IMAGE_NAME = node

build:
	docker build -t $(IMAGE_NAME) .

run:
	-docker rm -f $(IMAGE_NAME)
	-docker run -d --name $(IMAGE_NAME) --restart="always" \
	--link tarantool:tarantool \
	$(IMAGE_NAME)

bash:
	-docker exec -it $(IMAGE_NAME) bash