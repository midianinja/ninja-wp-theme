FROM hacklab/wp:6.4.2-php8.2

LABEL mantainer "hacklab/ <contato@hacklab.com.br>"

USER www-data

# Insert our data and dependencies
COPY ["compose/entrypoint-extra", "/docker-entrypoint-extra"]

# Fix file permissions
USER root
