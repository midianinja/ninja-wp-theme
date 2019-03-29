# Projeto inicial WordPress

Este repositório contém os arquivos iniciais para se ter um projeto WordPress
nos moldes do Hacklab. Isso significa que as ferramentas de desenvolvimento
e deploy estão protegidas por um padrão.

A ideia é que seja feito um fork deste repositório para começar um novo projeto
WordPress. Os arquivos deverão ser modificados conforme as peculiaridades do
projeto.

# Desenvolvimento

Docker é a ferramenta recomendada para desenvolver localmente. Para instalá-lo siga [estas instruções](https://docs.docker.com/install/linux/docker-ce/ubuntu/#os-requirements).

Para levantar o ambiente de desenvolvimento, basta executar:

```
docker-compose up
```

## Scripts para desenvolvimento
Há uma série de scripts úteis na pasta `dev-scripts`
- **dump.sh** - faz um dump do banco de desenvolvimento<br>
    exemplo de uso: `dev-scripts/$ ./dump.sh > dump.sql`
- **mysql.sh** - entra no shell do mysql com o usuário wordpress
- **mysql-root.sh** - entra no shell do mysql com o usuário root
- **wp.sh** - executa o comando wp-cli dentro do container wordpress<br>
    exemplo de uso: `dev-scripts/$ ./wp.sh search-replace https:// http://`

Acesse http://localhost para ver o site.

## Importar um dump de banco de dados
Se você tem um dump de banco de dados `.sql` ou `.sql.gz`, para importá-lo em sua versão local, copie o arquivo para `compose/local/data` e execute:

```
rm -rf mariadb_data/
docker-compose down
docker-compose up
```


# Instalando plugins e temas

## Copiando arquivos para dentro do repositório
O conteúdo de `wp-content` está excluído do versionamento por padrão. Para adicionar seu plugin ou tema como parte do repositório, você deve colocá-lo na pasta `plugin` ou `tema` que estão na raiz do repositório.

## Via composer

Existe na raiz do projeto um arquivo chamado `composer.json`. Nele devem conter
dependencias externas ao projeto WordPress.

Supondo que queremos adicionar o __tema__ *simppeli* ao nosso projeto, podemos
fazer com o comando abaixo.

```
composer require 'wpackagist-theme/simppeli:*'
```

O composer ira descarregar e instalatar o tema *simppeli*, além de atualizar o arquivo `composer.json`.

Com um comando semelhante também é possível instalar um __plugin__. Imagine
que escolhemos agora o plugin *jetpack-markdown*.

```
composer require 'wpackagist-plugin/jetpack-markdown:3.9.6'
```

O plugin será descarregado e o arquivo `composer.json` será atualizado com essa dependencia.

### Remover temas e plugins via composer

É importante que o `composer.json` tenha somente o necessário, sem ter
plugins ou temas que não são utilizados nos projetos.

Se deixar de usar o __tema__ *twentyseventeen*, remova-o do `compose.json`
com o comanado abaixo:

```
composer remove wpackagist-theme/twentyseventeen
```

Para deixar de usar um __plugin__, como o *all-in-one-wp-security-and-firewall*,
use o comando abaixo:

```
composer remove wpackagist-plugin/all-in-one-wp-security-and-firewall
```
