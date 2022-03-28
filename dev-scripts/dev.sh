#/bin/bash
docker-compose run --service-ports -it wordpress php -S 0.0.0.0:80 -t /var/www/html