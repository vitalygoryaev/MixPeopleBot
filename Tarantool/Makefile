IMAGE_NAME = tarantool

build:
	docker build -t $(IMAGE_NAME) .

run:
	-docker rm -f $(IMAGE_NAME)
	-docker run -d --name $(IMAGE_NAME) --restart="always" \
	-e "ADMIN_PASSWORD=secretpassword" \
	-e "WORKER_PASSWORD=workwork" \
	-p 3301:3301 \
	$(IMAGE_NAME)

bash:
	-docker exec -it $(IMAGE_NAME) bash