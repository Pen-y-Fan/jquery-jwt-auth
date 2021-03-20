# jquery-jwt-auth

This is a jQuery JWT and Express server authentication.

Original code forked from [chaofz/jquery-jwt-auth](https://github.com/chaofz/jquery-jwt-auth) 

## Quick start

```
npm install
node server.js
```

Open <localhost:8080> and click the buttons.

## More information

Docker has been included to allow the environment to be spun up using node12 alpine. A Makefile contains many of the 
useful commands required.

```shell
make install
make up
```

Will run the equivalent of:

```shell
docker run -u $(id -u):$(id -g) -v $(pwd):/app -w /app --rm -it node:12.18.4-alpine yarn
docker-compose up --build --remove-orphans -d server
```

