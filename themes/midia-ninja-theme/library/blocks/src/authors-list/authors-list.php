<?php

namespace Ninja;

function authors_list_block_callback( $attributes ) {

	$custom_class  = isset( $attributes['className'] ) ? sanitize_title( $attributes['className'] ) : '';
	$block_classes = [ 'authors-list-block' ];

	if ( ! empty( $custom_class ) ) {
		$block_classes[] = $custom_class;
	}

	$featured_authors_count = intval( $attributes['featuredAuthorsToShow'] ?? 5 );

	$latest_opinion_posts = get_posts( [
		'post_type'      => 'opiniao',
		'posts_per_page' => 3 * $featured_authors_count,
		'orderby'        => 'date',
		'order'          => 'DESC',
	] );

	$latest_authors     = [];
	$latest_authors_map = [];

	foreach ( $latest_opinion_posts as $post ) {
		$coauthors = get_coauthors( $post->ID );

		foreach ( $coauthors as $coauthor ) {

			if ( ! in_array( $coauthor->ID, $latest_authors ) ) {

				if ( get_post_meta( $coauthor->ID, 'colunista', true ) ) {

					$latest_authors[] = $coauthor->ID;
					$latest_authors_map[ $coauthor->ID ] = $coauthor;

					if ( count( $latest_authors ) === $featured_authors_count ) {
						break 2;
					}
				}
			}
		}
	}

	ob_start();
	?>

	<div class="<?= esc_attr( implode( ' ', $block_classes ) ) ?>">
		<div class="container">

			<!-- AUTORES DESTACADOS -->
			<?php if ( ! empty( $latest_authors_map ) ) : ?>
				<div class="authors-list-block__featured-authors">
					<?php foreach ( $latest_authors_map as $author ) :
						get_template_part(
							'library/blocks/src/authors-list/template-parts/featured-author',
							null,
							[ 'author' => $author ]
						);
					endforeach; ?>
				</div>
			<?php endif; ?>

			<!-- 🔎 CAMPO DE BUSCA -->
			<div class="authors-list-block__search">
				<input
					type="text"
					id="authors-search-input"
					class="authors-list-block__search-input"
					placeholder="Pesquisar colunista..."
					autocomplete="off"
				/>
			</div>

			<?php if ( ! empty( $attributes['subheading'] ) ) : ?>
				<h2 class="authors-list-block__subheading">
					<?= esc_html( $attributes['subheading'] ) ?>
				</h2>
			<?php endif; ?>

			<!-- CONTAINER ONDE O REACT VAI MONTAR -->
			<div
				id="authors-react-root"
				class="authors-list-block__authors"
			></div>

		</div>
	</div>

	<?php

	return ob_get_clean();
}
