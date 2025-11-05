<?php
$especial_term = get_primary_term(get_the_ID(), 'marcador_especial');

if (! empty($especial_term)):
	$especial_pages = get_posts([
		'post_type' => 'especial',
		'tax_query' => [[
			'taxonomy' => 'marcador_especial',
			'field' => 'term_id',
			'terms' => $especial_term->term_id,
		]],
	]);

	$especial_menu = [
		'background_color' => '#333333',
		'id' => null,
		'link_color' => '#FFFFFF',
		'logo_desktop' => null,
		'logo_mobile' => null,
	];

	$especial_menu_keys = ['background_color', 'id', 'link_color', 'logo_desktop', 'logo_mobile'];

	foreach ($especial_menu_keys as $meta_key) {
		$meta_value = get_term_meta($especial_term->term_id, 'menu_' . $meta_key, true);

		if (! empty($meta_value)) {
			$especial_menu[$meta_key] = $meta_value;
		}
	}

	if (! empty($especial_menu['id']) && ! empty($especial_pages)):
		$especial_page = $especial_pages[0];
		$especial_style = "--menu-especial-bg: {$especial_menu['background_color']}; --menu-especial-link: {$especial_menu['link_color']}";
?>
	<header class="header-especiais">
		<div class="menu-especial menu-especial--<?= $especial_term->slug ?>" style="<?= $especial_style ?>">
			<button class="menu-especial__scroll-btn menu-especial__scroll-btn--left" aria-label="Anterior">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
					<path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
				</svg>
			</button>

			<a class="menu-especial__logo-desktop" href="<?= home_url('/') ?>">
				<?= wp_get_attachment_image($especial_menu['logo_desktop'], 'medium', true) ?>
			</a>

			<?php if (! empty($especial_menu['logo_mobile'])) : ?>
				<a class="menu-especial__logo-desktop" href="<?= home_url('/') ?>">
					<?= wp_get_attachment_image($especial_menu['logo_mobile'], 'medium', true) ?>
				</a>

				<style>
					@media (max-width: 768px) {
						.single-especial .wp-block-columns:first-of-type>.wp-block-column:first-child {
							display: none !important;
						}
					}
				</style>
			<?php endif; ?>

			<nav class="menu-especial__links">
				<?php wp_nav_menu( [
						'menu' => intval( $especial_menu['id'] ),
						'container_class' => 'menu-container'
				] ) ?>
			</nav>

			<button class="menu-especial__scroll-btn menu-especial__scroll-btn--right" aria-label="Próximo">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
					<path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
				</svg>
			</button>
		</div>
	</header>
	<?php endif; ?>
<?php endif; ?>
