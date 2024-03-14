# Cabeçalho e Rodapé das Listagens (archives e page templates)

## Instalação

Certifique que o arquivo `/library/header-and-footer-archive/header-and-footer-archive.php` está sendo incluído no `functions.php` do tema.
Importe o arquivo `/library/header-and-footer-archive/pods/header-and-footer-archive.json` utilizando o plugin [Pods](https://br.wordpress.org/plugins/pods/).

## Como usar

### Registrando e criando cabeçalhos e rodapés

No painel, acesse o menu do Pods em Editar Pods. No CPT Cabeçalho/Rodapé das Listagens clique em Editar, em seguida em Listagem (archive/página), clique em Editar. Role o modal de configuração do campo até o final e coloque um nome relacionado ao cabeçalho ou rodapé que você irá criar seguindo o modelo (ex: post|Post). Salve o campo e depois salve o Pod. Esse processo irá registrar a archive para receber o cabeçalho e/ou rodapé.

No menu Aparência acesse Cabeçalho/Rodapé das Listagens (disponível apenas para usuários Admin) e adicione um novo. Edite como um post normal, usando blocos Gutenberg.
Na parte inferior da edição, marque a posição (Cabeçalho ou Rodapé) e em qual página ele será usado (no campo Listagem (archive)).

### Como exibir na archive/page template

Na edição do arquivo PHP referente a archive ou o page template, adicione `<?php echo get_layout_archive( 'blog', 'header' ); ?>` alterando os parâmetros da função para atender corretamente à página em questão e a posição

Outras duas funções estão disponíveis para exibição dos templates e são específicas para cada posição (Cabeçalho ou Rodapé):

`<?php echo get_layout_header( 'blog' ); ?>` e `<?php echo get_layout_footer( 'blog' ); ?>`
