<?php

namespace Ninja;

function authors_list_block_callback( $attributes ) {
	$custom_class = isset( $attributes['className'] ) ? sanitize_title( $attributes['className'] ) : '';
    $block_classes[] = 'authors-list-block';

    if ( ! empty( $custom_class ) ){
        $block_classes[]   = $custom_class;
    }

	$featured_authors_count = intval( $attributes['featuredAuthorsToShow'] );

	$latest_opinion_posts = get_posts( [
		'post_type' => 'opiniao',
		'posts_per_page' => 3 * $featured_authors_count,
		'orderby' => 'date',
		'order' => 'DESC',
	] );

	$latest_authors = [];
	$latest_authors_map = [];

	foreach ( $latest_opinion_posts as $post ) {
		$coauthors = get_coauthors( $post->ID );
		foreach ( $coauthors as $coauthor ) {
			if ( ! in_array( $coauthor->ID, $latest_authors ) ) {
				$latest_authors[] = $coauthor->ID;
				$latest_authors_map[ $coauthor->ID ] = $coauthor;

				if ( count( $latest_authors ) == $featured_authors_count ) {
					break 2;
				}
			}
		}
	}

    ob_start();
	?>

	<div class="<?= implode( ' ', $block_classes ) ?>">
		<div class="container">
			<div class="authors-list-block__featured-authors">
			<?php foreach ( $latest_authors_map as $id => $author ):
				get_template_part( 'library/blocks/src/authors-list/template-parts/featured-author', null, [ 'author' => $author ] );
			endforeach; ?>
			</div>

			<h2><?= $attributes['subheading'] ?></h2>
			<div class="authors-list-block__authors">
				<?php get_template_part( 'library/blocks/src/authors-list/template-parts/other-authors', null, [ 'latest' => $latest_authors ] ); ?>
			</div>
		</div>
	</div>

	<?php
    $output = ob_get_clean();

    return $output;
}
