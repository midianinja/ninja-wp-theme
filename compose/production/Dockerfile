FROM hacklab/wordpress:v4.9.6-php7

LABEL mantainer "hacklab/ <contato@hacklab.com.br>"

ARG composer='--no-dev'
USER www-data

# Insert our data and dependencies
COPY ["compose/entrypoint-extra", "/docker-entrypoint-extra"]
COPY ["compose/production/wordpress/php/extra.ini", "/usr/local/etc/php/conf.d/extra.ini"]
COPY ["compose/production/wordpress/wp-config.d/", "/var/www/html/wp-config.d"]
COPY ["composer.json", "/var/www/html/composer.json"]
RUN mkdir vendor
RUN composer install -v $composer
COPY ["wp-content", "/var/www/html/wp-content"]
COPY ["plugins", "/var/www/html/plugins"]
COPY ["themes", "/var/www/html/themes"]


# Fix file permissions
USER root
RUN chown -R www-data: wp-content
