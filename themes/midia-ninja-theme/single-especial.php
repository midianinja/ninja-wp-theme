<?php

/**
 * The template for displaying all single posts of the CPT Especiais
 */

gt_set_post_view();
get_header();
get_template_part( 'template-parts/header-especiais' );
?>

<div class="container container-single" id="single-especial">
	<?php while ( have_posts() ) :
		the_post(); ?>
		<div class="post-content">
			<?php the_content(); ?>
		</div>

	<?php endwhile;?>
</div>

<?php get_footer();
