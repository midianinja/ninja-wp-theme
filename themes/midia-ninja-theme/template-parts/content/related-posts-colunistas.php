<?php

$post_id = get_the_ID();
$displayed_authors = []; // Array para armazenar os slugs dos autores já exibidos
$related_posts = []; // Array para armazenar os posts selecionados
$limit = 3; // Quantidade de posts desejada

?>

<h2><?php _e('Conheça outros colunistas', 'ninja'); ?></h2>
<div class="related">

    <?php
    // Loop para executar três consultas, uma para cada post desejado
    for ($i = 0; $i < $limit; $i++) {
        $args = [
            'post_type'      => 'opiniao',
            'posts_per_page' => 1,
            'orderby'        => 'rand',
            'post__not_in'   => [$post_id],
        ];

        // Se já temos autores exibidos, adicionamos a exclusão deles na query
        if (!empty($displayed_authors)) {
            $args['tax_query'] = [
                [
                    'taxonomy' => 'author', // Ajuste para o termo correto se o Co-Authors Plus usa outra taxonomia
                    'field'    => 'slug',
                    'terms'    => $displayed_authors,
                    'operator' => 'NOT IN',
                ],
            ];
        }

        $query = get_posts($args);

        // Se encontrar um post, adiciona aos resultados e armazena o autor
        if ($query){
			setup_postdata($query[0]);
            // Obtém os co-autores do post
            $coauthors = get_coauthors();

            // Armazena os slugs dos co-autores exibidos
            foreach ($coauthors as $coauthor) {
                $displayed_authors[] = $coauthor->user_nicename;
            }

            // Armazena o post no array para exibição
            $related_posts[] = $query[0];

            wp_reset_postdata();
        }
    }

    // Exibe os posts encontrados
    foreach ($related_posts as $post) :
        setup_postdata($post);
        ?>

        <div class="related-post-card">
            <a class="related-post-image" href="<?php the_permalink(); ?>">
                <?php
                if (has_post_thumbnail()) {
                    the_post_thumbnail();
                } else {
                    echo '<img src="' . get_stylesheet_directory_uri() . '/assets/images/default-image.png">';
                }
                ?>
            </a>

            <div class="related-post-content">
                <div class="info">
                    <a href="<?php the_permalink(); ?>">
                        <h4><?php the_title(); ?></h4>
                    </a>
                    <?php
                    // Exibe os nomes dos co-autores
                    $coauthors = get_coauthors();
                    foreach ($coauthors as $coauthor) {
                        echo '<h5>' . esc_html($coauthor->display_name) . '</h5>';
                    }
                    ?>
                </div>
            </div>
        </div>

    <?php endforeach; wp_reset_postdata(); ?>
</div>
