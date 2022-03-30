#/bin/bash
docker-compose down
docker-compose run --service-ports wordpress php -S 0.0.0.0:80 -t /var/www/html