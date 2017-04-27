# Projeto inicial WordPress

Este repositório contém os arquivos iniciais para se ter um projeto WordPress
nos moldes do Hacklab. Isso significa que as ferramentas de desenvolvimento
e deploy estão protegidas por um padrão.

A ideia é que seja feito um fork deste repositório para começar um novo projeto
WordPress. Os arquivos deverão ser modificados conforme as peculiaridades do
projeto.


## Desenvolvimento

### Versionamento

O conteúdo de `wp-content` está excluído do versionamento por padrão. Para adicionar
seu plugin ou tema em wp-content, voce deve tirá-lo da regra de exclusão manualmente
editando o arquivo `.gitignore`.

Suponha que voce está criando o tema `hackawesome`, digite o seguinte comando para
que o tema não entre para a regra de exclusão.

```
echo '!wp-content/themes/hackawesome >> .gitginore
```

Se for um plugin

```
echo '!wp-content/plugins/hackawesome >> .gitginore
```

Voce pode fazer para quantos plugins forem necessário

```
echo '!wp-content/plugins/plugin1 >> .gitginore
echo '!wp-content/plugins/plugin2 >> .gitginore
```


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


### Remover temas e plugins

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


