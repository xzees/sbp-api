# Sabuypay API

### Prerequisites
- Docker
- Docker Compose

### How to run project
1. Go to project's root directory.
2. `docker-compose --compatibility -f docker-compose.dev.yml run --rm install`
3. wait for database start complete
4. `docker-compose --compatibility -f docker-compose.dev.yml run --rm -p 5000:5000 dev`
5. Application will be served at http://localhost:5000

### Environment variables reference
| name | env variable |
| ------ | ------ |
| Database Host | DB_HOST |
| Database Port | DB_PORT |
| Database User | DB_USER |
| Database Password | DB_PASS |
| Database Name | DB_NAME |
| Database Enable Log | DB_ENABLE_LOG |
| Cache Host | REDIS_HOST |
| Cache Port | REDIS_PORT |
| Cache Password | REDIS_PASSWORD |
| SENTRY dsn | SENTRY |
| ------ | ------ |