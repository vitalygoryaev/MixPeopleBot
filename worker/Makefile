IMAGE_NAME = worker

build:
	docker build -t $(IMAGE_NAME) .

run:
	-docker rm -f $(IMAGE_NAME)
	-docker run -d --name $(IMAGE_NAME) \
	--link rabbit:rabbit \
	$(IMAGE_NAME)

bash:
	-docker exec -it $(IMAGE_NAME) bash