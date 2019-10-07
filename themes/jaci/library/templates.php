<?php
namespace jaci;

/**
 * Função para resolver o problema exposto em https://mekshq.com/passing-variables-via-get_template_part-wordpress/
 * @param string $template_name nome do template localizado dentro pasta template-parts do tema
 * @param array $params
 */
function template_part($template_name, $params = []){
    $template_filename = locate_template("template-parts/{$template_name}.php");

    extract($params);

    include $template_filename;;
}