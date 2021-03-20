# Usage:

# make up - starts the docker-compose in the same directory in demon (background)
# make up-f - start the docker-compose in foreground (useful for error messages)
# make down - stops the docker-compose
# make server - same as make up
# make shell - opens a shell terminal in the running node container as a standard user
# make shell-root - opens a shell terminal in the running node container as a root user
# make chown - runs chown, as root user to reset the ownership of all folders to the standard user

up:
	docker-compose up --build --remove-orphans -d server
up-f:
	docker-compose up --build --remove-orphans server
down:
	docker-compose down --remove-orphans
server:
	docker-compose up --build --remove-orphans -d server
install:
	docker run -u $(shell id -u):$(shell id -g) -v $(shell pwd):/app -w /app --rm -it node:12.18.4-alpine yarn

shell:
	docker-compose exec -u ${shell id -u}:${shell id -g} server /bin/sh
shell-root:
	docker-compose exec -u 0:0 server /bin/sh
shell-run:
	docker-compose run -u ${shell id -u}:${shell id -g} server /bin/sh


chown:
	docker-compose exec -u 0:0 server chown -R ${shell id -u}:${shell id -g} ./
