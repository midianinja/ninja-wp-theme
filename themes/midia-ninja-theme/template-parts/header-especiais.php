<?php
$especial_term = get_primary_term( get_the_ID(), 'marcador_especial' );

if ( ! empty( $especial_term ) ):
	$especial_pages = get_posts( [
		'post_type' => 'especial',
		'tax_query' => [[
			'taxonomy' => 'marcador_especial',
			'field' => 'term_id',
			'terms' => $especial_term->term_id,
		]],
	] );

	$especial_menu = [
		'background_color' => '#333333',
		'id' => null,
		'link_color' => '#FFFFFF',
		'logo_desktop' => null,
		'logo_mobile' => null,
	];

	$especial_menu_keys = ['background_color', 'id', 'link_color', 'logo_desktop', 'logo_mobile'];

	foreach ( $especial_menu_keys as $meta_key ) {
		$meta_value = get_term_meta( $especial_term->term_id, 'menu_' . $meta_key, true );

		if ( ! empty( $meta_value ) ) {
			$especial_menu[ $meta_key ] = $meta_value;
		}
	}

	if ( ! empty( $especial_menu['id'] ) && ! empty( $especial_pages ) ):
		$especial_page = $especial_pages[0];
		$especial_style = "--menu-especial-bg: {$especial_menu['background_color']}; --menu-especial-link: {$especial_menu['link_color']}";
?>
		<div class="menu-especial menu-especial--<?= $especial_term->slug ?>" style="<?= $especial_style ?>">
			<a class="menu-especial__logo-desktop" href="<?= get_permalink( $especial_page->ID ) ?>">
				<?= wp_get_attachment_image( $especial_menu['logo_desktop'], 'medium', true ) ?>
			</a>
			<a class="menu-especial__logo-mobile" href="<?= get_permalink( $especial_page->ID ) ?>">
				<?= wp_get_attachment_image( $especial_menu['logo_mobile'], 'medium', true ) ?>
			</a>
			<nav class="menu-especial__links">
				<?php wp_nav_menu( [ 'menu' => intval( $especial_menu['id'] ) ] ) ?>
			</nav>
		</div>
	<?php endif; ?>
<?php endif; ?>
