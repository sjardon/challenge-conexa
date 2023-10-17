docker network create conexa-challenge

docker run --network conexa-challenge -p 5432:5432 --name conexa_db_2 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=conexa-movies postgres

docker run --network conexa-challenge -p 3001:3000 --env-file .env conexa-service-2:latest
