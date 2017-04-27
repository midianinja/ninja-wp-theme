# Projeto inicial WordPress

Este repositório contém os arquivos iniciais para se ter um projeto WordPress
nos moldes do Hacklab. Isso significa que as ferramentas de desenvolvimento
e deploy estão protegidas por um padrão.

A ideia é que seja feito um fork deste repositório para começar um novo projeto
WordPress. Os arquivos deverão ser modificados conforme as peculiaridades do
projeto.


## Desenvolvimento

### Composer

Existe na raiz do projeto um arquivo chamado `composer.json`. Nele devem conter
dependencias externas ao projeto WordPress, como plugins ou temas.

#### Adicionar dependencias plugins e temas

Supondo que queremos adicionar o __tema__ *simppeli* ao nosso projeto, podemos
fazer com o comando abaixo.

```
composer require 'wpackagist-theme/simppeli:*'
```

O composer ira descarregar e instalatar o tema *simppeli* dentro da pasta
`wp-content/themes`, além de atualizar o arquivo `composer.json`.

Com um comando semelhante também é possível instalar um __plugin__. Imagine
que escolhemos agora o plugin *jetpack-markdown*.

```
composer require 'wpackagist-plugin/jetpack-markdown:3.9.6'
```

O plugin será descarregado e instalado na pasta `wp-content/plugins` e o
arquivo `composer.json` será atualizado com essa dependencia.


### `docker-compose`

Para que o projeto rode corretamente em ambiente de desenvolviment, é
necessário que seja executado `composer install` antes de inicializar
os containers.

Para inicializar os containers, basta digitar o seguinte comando

```
docker-composer up
```

Para parar e destruir os containers, digite

```
docker-composer down
```


