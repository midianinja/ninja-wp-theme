# base-theme-name

Este repositório contém os arquivos iniciais para se ter um projeto WordPress
nos moldes do Hacklab. Isso significa que as ferramentas de desenvolvimento
e deploy estão protegidas por um padrão.

A ideia é que seja feito um fork deste repositório para começar um novo projeto
WordPress. Os arquivos deverão ser modificados conforme as peculiaridades do
projeto.

# Desenvolvimento

## Editor
Para o desenvolvimento recomenda-se a utilização do editor Visual Studio Code com as seguintes extenções:

- EditorConfig for VS Code
- PHP Intelephense
- Docker
- Beautify
- Beautify css/sass/scss/less
- GitLens
- ...

## Requisitos
Para o desenvolvimento é requisito ter instaladas ao menos as seguintes ferramtas:

- **Git**
- **Docker** e **Docker Compose** - Docker é a ferramenta recomendada para desenvolver localmente. Para instalá-lo siga [estas instruções](https://docs.docker.com/install/#supported-platforms).
- **node** e **npm**

## Clonando o repositório
Clone o repositório e seus submódulos recursivamente:

```
$ git clone git@git.hacklab.com.br:open-source/base-wordpress-project.git --recursive
```

## Compilando os assets do tema
Abra um terminar, vá até a a pasta `themes/base-theme-slug/` e execute os comandos abaixo:

```
$ npm install
$ npm run watch # vai ficar observando as mudanças nos assets
```


## Subindo o ambiente
Abra outro terminal e na raíz do repositório execute o comando abaixo:

```
docker-compose up
```

## Scripts para desenvolvimento
Há uma série de scripts úteis na pasta `dev-scripts`
- **dump** - faz um dump do banco de desenvolvimento<br>
    exemplo de uso: `dev-scripts/$ ./dump > dump.sql`
- **mysql** - entra no shell do mysql com o usuário wordpress
- **mysql-root** - entra no shell do mysql com o usuário root
- **wp** - executa o comando wp-cli dentro do container wordpress<br>
    exemplo de uso: `dev-scripts/$ ./wp search-replace https:// http://`

Acesse http://localhost para ver o site.

## Importar um dump de banco de dados
Se você tem um dump de banco de dados `.sql` ou `.sql.gz`, para importá-lo em sua versão local, copie o arquivo para `compose/local/mariadb/data` e execute:

```
docker-compose down -v # o parametro -v apaga os dados do mariadb
docker-compose up 
```

# Instalando plugins e temas

## Copiando arquivos para dentro do repositório
O conteúdo de `wp-content` está excluído do versionamento por padrão. Para adicionar seu plugin ou tema como parte do repositório, você deve colocá-los nas pastas `plugins` ou `themes` que estão na raiz do repositório.
