<?php
$especial_term = get_primary_term(get_the_ID(), 'marcador_especial');

if (! empty($especial_term)):
	$especial_pages = get_posts([
		'post_type' => 'especial',
		'tax_query' => [[
			'taxonomy' => 'marcador_especial',
			'field'    => 'term_id',
			'terms'    => $especial_term->term_id,
		]],
	]);

	$especial_menu = [
		'background_color' => '#333333',
		'id'               => null,
		'link_color'       => '#FFFFFF',
		'logo_desktop'     => null,
		'logo_mobile'      => null,
	];

	$especial_menu_keys = ['background_color', 'id', 'link_color', 'logo_desktop', 'logo_mobile'];

	foreach ($especial_menu_keys as $meta_key) {
		$meta_value = get_term_meta($especial_term->term_id, 'menu_' . $meta_key, true);
		if (! empty($meta_value)) {
			$especial_menu[$meta_key] = $meta_value;
		}
	}

	if (! empty($especial_menu['id']) && ! empty($especial_pages)):
		$especial_page  = $especial_pages[0];
		$especial_style = "--menu-especial-bg: {$especial_menu['background_color']}; --menu-especial-link: {$especial_menu['link_color']}";

		$logo_href = home_url('/');

		if ( 'cop30' === $especial_term->slug ) {
			$logo_href = home_url('/especial/cop-30/');
		}
?>
		<header class="header-especiais">
			<div class="menu-especial menu-especial--<?= $especial_term->slug ?>" style="<?= $especial_style ?>">

				<button class="menu-especial__scroll-btn menu-especial__scroll-btn--left" aria-label="Anterior">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
						<path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
					</svg>
				</button>

				<a class="menu-especial__logo-desktop" href="<?= $logo_href ?>">
					<?= wp_get_attachment_image($especial_menu['logo_desktop'], 'medium', true) ?>
				</a>

				<?php if (! empty($especial_menu['logo_mobile'])) : ?>
					<a class="menu-especial__logo-desktop" href="<?= $logo_href ?>">
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

				<?php
				$languages    = apply_filters('wpml_active_languages', null, ['skip_missing' => 0, 'orderby' => 'id']);
				$current_code = apply_filters('wpml_current_language', null);

				$menu_id_base = intval($especial_menu['id']);
				$menu_id_i18n = apply_filters('wpml_object_id', $menu_id_base, 'nav_menu', true, $current_code);
				if (! $menu_id_i18n) {
					$menu_id_i18n = $menu_id_base;
				}

				$append_switcher = function ($items, $args) use ($languages, $current_code, $menu_id_base, $menu_id_i18n) {
					static $done = false;

					$rendered_menu_id = 0;
					if (is_object($args->menu) && isset($args->menu->term_id)) {
						$rendered_menu_id = intval($args->menu->term_id);
					} elseif (! empty($args->menu)) {
						$rendered_menu_id = intval($args->menu);
					}

					$is_target_menu = ($rendered_menu_id === $menu_id_i18n) || ($rendered_menu_id === $menu_id_base);

					if (! $is_target_menu && ! $done) {
						$is_target_menu = (! empty($args->container_class) && $args->container_class === 'menu-container');
					}

					if ($done || empty($languages) || ! is_array($languages) || ! $is_target_menu) {
						return $items;
					}

					ob_start(); ?>
					<li class="menu-item menu-item--lang">
						<label class="sr-only" for="lang-switcher-especial">Idioma</label>
						<select id="lang-switcher-especial" class="menu-especial__lang-select" aria-label="Trocar idioma">
							<?php foreach ($languages as $code => $lang):
								$url      = isset($lang['url']) ? $lang['url'] : '';
								$label    = $lang['native_name'] ?? strtoupper($code);
								$selected = selected($code, $current_code, false);
							?>
								<option value="<?php echo esc_url($url); ?>" <?php echo $selected; ?> data-code="<?php echo esc_attr($code); ?>">
									<?php echo esc_html($label); ?>
								</option>
							<?php endforeach; ?>
						</select>
					</li>
				<?php
					$switcher_li = ob_get_clean();
					$done        = true;
					return $items . $switcher_li;
				};

				add_filter('wp_nav_menu_items', $append_switcher, 10, 2);
				?>
				<nav class="menu-especial__links">
					<?php wp_nav_menu([
						'menu'            => $menu_id_i18n,
						'container_class' => 'menu-container'
					]); ?>
				</nav>
				<?php remove_filter('wp_nav_menu_items', $append_switcher, 10); ?>

				<button class="menu-especial__scroll-btn menu-especial__scroll-btn--right" aria-label="Próximo">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
						<path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
					</svg>
				</button>
			</div>
		</header>
	<?php endif; ?>
<?php endif; ?>
