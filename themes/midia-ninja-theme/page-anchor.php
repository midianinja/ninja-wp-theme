<?php
/**
 * Template Name: Página com âncoras
 */
get_header();

$post_id  = get_the_ID();
$subtitle = get_post_meta($post_id, 'subtitulo', true);
$titulo_tag = get_post_meta($post_id, 'titulo_tag', true);

?>

<div class="index-wrapper page-with-title">
    <div class="container">
		<?php

			if ( is_page('perguntas-frequentes') ) :
				echo get_layout_header( 'perguntas-frequentes' );
			elseif( is_page('documentacao') ) :
				echo get_layout_header( 'documentacao' );
			endif;
		?>
        <div class="row">
            <div class="col-md-3 sidebar-page">


			<?php if ( is_page('perguntas-frequentes') ) :?>
					<p class="anchor-title"><?= __('What is Mídia Ninja', 'ninja') ?></p>
				<?php elseif( is_page('documentacao') ) : ?>
					<p class="anchor-title"><?= __('Topics', 'ninja') ?></p>
			<?php endif;?>
                <ul id="anchors"></ul>
            </div>
            <div class="col-md-9 content">
                <?php the_content() ?>
            </div>
        </div>
        <?php

			if ( is_page('perguntas-frequentes') ) :
				echo get_layout_footer( 'perguntas-frequentes' );
			elseif( is_page('documentacao') ) :
				echo get_layout_footer( 'documentacao' );
			endif;
		?>
    </div>
</div>

<?php get_footer();
