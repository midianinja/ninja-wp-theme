<?php
$especial_terms = get_the_terms( get_the_ID(), 'marcador_especial' );

if ( ! empty( $especial_terms ) ):
	$especial_term = $especial_terms[0];

	$especial_pages = get_posts( [
		'post_type' => 'especial',
		'tax_query' => [[
			'taxonomy' => 'marcador_especial',
			'field' => 'term_id',
			'terms' => $especial_term->term_id,
		]],
	] );

	$especial_menu = (object) [
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
			$especial_menu->{$meta_key} = $meta_value;
		}
	}

	if ( ! empty( $especial_menu->id ) && ! empty( $especial_pages ) ):
		$especial_page = $especial_pages[0];
?>
		<div class="menu-especial menu-especial--<?= $especial_term->slug ?>" style="--especial-menu-bg: <?= $especial_menu->background_color ?>; --especial-menu-link: <?= $especial_menu->link_color ?>">
			<div class="menu-especial__desktop">
				<a class="menu-especial__logo" href="<?= get_permalink( $especial_page->ID ) ?>">
					<?= wp_get_attachment_image( $especial_menu->logo_desktop, 'thumbnail', true ) ?>
				</a>
				<?php wp_nav_menu( [ 'menu' => intval( $especial_menu->id ), 'menu_class' => 'especial-menu__nav', 'container' => 'nav' ] ) ?>
			</div>

			<div class="menu-especial__mobile">
				<?php wp_nav_menu( [ 'menu' => intval( $especial_menu->id ), 'menu_class' => 'especial-menu__nav', 'container' => 'nav' ] ) ?>
				<a class="menu-especial__logo" href="<?= get_permalink( $especial_page->ID ) ?>">
					<?= wp_get_attachment_image( $especial_menu->logo_mobile, 'thumbnail', true ) ?>
				</a>
			</div>
		</div>
	<?php endif; ?>
<?php endif; ?>
