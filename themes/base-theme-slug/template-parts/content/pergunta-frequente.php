<?php

$args_asks = [
    'post_type'      => 'perguntas_frequentes',
    'posts_per_page' => 99,
    'tax_query'      => [
        [
            'taxonomy' => 'assuntos',
            'terms'    => $args['term']->term_id
        ]
    ]
];

if ( $args['project'] ) {
    $args_asks['tax_query'] = [
        'relation' => 'AND',
        [
            'taxonomy' => 'assuntos',
            'terms'    => $args['term']->term_id
        ],
        [
            'taxonomy' => $args['project']['taxonomy'],
            'terms'    => $args['project']['term_id']
        ]
    ];
}

$asks = new WP_Query( $args_asks );
$first = true;

if ( $asks->have_posts() ) :

    echo '<div class="content-subject">';
    echo '<section>';
    echo '<h2 class="title-with-graphics"><span># ' . apply_filters( 'the_title', $args['term']->name ) . ' </span> <span class="line"></span></h2>';
    echo '</section>';
       
        echo '<ul class="each-subject subject-' . sanitize_title( $args['term']->slug ) . '">';

            while ( $asks->have_posts() ) {
                $asks->the_post();

                //echo '<li class="post-' . get_the_ID() . ' ' . get_terms_like_class( get_the_ID(), 'category', 'projeto-' ) . ' active">';

                echo '<li class="post-'. get_the_ID() . ' ' .($first ? 'active' : '').' ' . get_terms_like_class( get_the_ID(), 'category', 'projeto-' ) .'">';

                if ($first) {
                    $first = false;
                }

                    echo '<div class="title">';
                        echo apply_filters( 'the_title', get_the_title() );
                    echo '</div>';

                    echo '<div class="content">';
                        echo apply_filters( 'the_content', get_the_content() );
                    echo '</div>';

                echo '</li>';
            }

        echo '</ul>';

        wp_reset_postdata();

    echo '</div>';

endif; ?>