FROM hacklab/wordpress:v5.2.3-php7.3

LABEL mantainer "hacklab/ <contato@hacklab.com.br>"

ARG composer='--no-dev'
USER www-data

# Insert our data and dependencies
COPY ["compose/entrypoint-extra", "/docker-entrypoint-extra"]
COPY ["compose/production/wordpress/php/extra.ini", "/usr/local/etc/php/conf.d/extra.ini"]
COPY ["compose/production/wordpress/wp-config.d/", "/var/www/html/wp-config.d"]
COPY ["wp-content", "/var/www/html/wp-content"]
COPY ["plugins", "/var/www/plugins"]
COPY ["themes", "/var/www/themes"]


# Fix file permissions
USER root
RUN chown -R www-data: wp-content
