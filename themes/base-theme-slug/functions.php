<?php
namespace hacklabTema;

// Blocos ativos:
add_filter('hacklab_blocos_ativos','hacklabTema\\blocos_ativos');
function blocos_ativos($blocos_ativos){
    // unset($blocos_ativos['sample-block']);
    return $blocos_ativos;
}

require __DIR__ . '/library/supports.php';
require __DIR__ . '/library/sidebars.php';
require __DIR__ . '/library/menus.php';
require __DIR__ . '/library/assets.php';
require __DIR__ . '/library/api/index.php';
require __DIR__ . '/library/sanitizers/index.php';
require __DIR__ . '/library/template-tags/index.php';
require __DIR__ . '/library/customizer/index.php';
require __DIR__ . '/library/blocks/index.php';
require __DIR__ . '/library/utils.php';


