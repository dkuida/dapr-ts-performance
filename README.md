# dapr-ts-performance

## Deploy
```shell
docker compose --env-file .docker.env up -d
```

## Usage
```shell
curl --location 'http://localhost:9000/store' \                    
--header 'Content-Type: application/json' \
--data '{
    "id": "someId", "foo": "bar"
}'
```
