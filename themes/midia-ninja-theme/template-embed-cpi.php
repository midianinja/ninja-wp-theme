<?php
/**
 * Template Name: Embed CPI da Covid
 */

$remote_url = 'https://antigo.midianinja.org/cpi-da-covid/';
// Cache key is versioned with the pipeline format: when the shape of $content
// changes (e.g. the prepended design CSS block), old-format transients must be
// invalidated on deploy instead of serving stale markup for up to 1h — that is
// exactly what made the credits section render unstyled/invisible on the first
// deploy (cached content predated the design CSS extraction).
$cache_version = 'v3';
$cache_key    = 'embed_cpi_cache_' . $cache_version . '_' . md5($remote_url);
$content      = get_transient($cache_key);

if (empty($content)) {
	$response = wp_remote_get($remote_url, [
		'timeout'   => 30,
		'sslverify' => false,
	]);

	if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
		$html = wp_remote_retrieve_body($response);

		// O libxml trata o interior de <script> como HTML e corrompe strings JS
		// que contenham tags (ex.: wrapAll('<div ...>')), injetando </script> no
		// meio do código. Protege os blocos <script> com placeholders antes do
		// parse e reinjeta-os depois, byte-idênticos.
		$script_blocks = [];
		$html = preg_replace_callback(
			'/<script\b[^>]*>.*?<\/script>/is',
			function ($matches) use (&$script_blocks) {
				$script_blocks[] = $matches[0];
				return '<!--EMBED_CPI_SCRIPT_' . (count($script_blocks) - 1) . '-->';
			},
			$html
		);

		$dom = new DOMDocument();
		libxml_use_internal_errors(true);
		$dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
		$xpath = new DOMXPath($dom);

		$selectors = [
			'//main',
			'//div[contains(@class, "entry-content")]',
			'//div[contains(@class, "content")]',
			'//div[@id="content"]',
			'//article',
			'//div[contains(@class, "post")]',
		];

		$node = null;
		foreach ($selectors as $selector) {
			$nodes = $xpath->query($selector);
			if ($nodes->length > 0) {
				$node = $nodes->item(0);
				break;
			}
		}

		if ($node) {
			// Remove headers and footers more aggressively
			$header_footer_query = './/header | .//footer | .//*[@id="header"] | .//*[contains(@class, "site-header")] | .//*[@id="masthead"] | .//*[contains(@class, "td-header-wrap")]';
			foreach ($xpath->query($header_footer_query, $node) as $child) {
				$child->parentNode->removeChild($child);
			}

			// The old page keeps most of its design in <head> inline styles that
			// are not carried by the markup scrape. Extract the two Divi cached
			// style blocks (global customizer rules + per-module design rules)
			// from the same DOMDocument so the scraped markup renders styled.
			$design_css = '';
			foreach (['et-divi-customizer-global-cached-inline-styles', 'et-builder-module-design-cached-inline-styles'] as $style_id) {
				$style_nodes = $xpath->query('//style[@id="' . $style_id . '"]');
				if ($style_nodes->length > 0) {
					$design_css .= $style_nodes->item(0)->textContent . "\n";
				}
			}

			$content = '';
			foreach ($node->childNodes as $child) {
				$content .= $dom->saveHTML($child);
			}

			// Reinjeta os <script> protegidos. O do lightbox antigo (jQuery/Magnific)
			// fica de fora: é substituído pelo modal vanilla embed-cpi-modal.js.
			$content = preg_replace_callback(
				'/<!--EMBED_CPI_SCRIPT_(\d+)-->/',
				function ($matches) use (&$script_blocks) {
					$block = $script_blocks[(int) $matches[1]];
					return (strpos($block, 'lightbox-trigger') !== false) ? '' : $block;
				},
				$content
			);

			$base_url = 'https://antigo.midianinja.org';
			$content = str_replace(['src="/', "src='/"], 'src="' . $base_url . '/', $content);
			$content = str_replace(['href="/', "href='/"], 'href="' . $base_url . '/', $content);
			$content = str_replace("src='/" , "src='" . $base_url . "/", $content);
			$content = str_replace("href='/" , "href='" . $base_url . "/", $content);

			// Âncoras da própria página: rolam até a seção dentro do embed,
			// como no antigo, em vez de navegar para fora do site.
			$content = str_replace('https://antigo.midianinja.org/cpi-da-covid/#', '#', $content);

			// Prepend the old-site inline design CSS so it is cached together
			// with the markup and applies to it inside the embed.
			if ($design_css !== '') {
				$content = '<style id="embed-cpi-design-css">' . $design_css . '</style>' . $content;
			}

			set_transient($cache_key, $content, HOUR_IN_SECONDS);
		}
	}
}

get_header(); ?>

<div class="container" style="overflow-x: hidden;">
	<main class="content embed-cpi-content" style="overflow-x: hidden;">
		<?php if (!empty($content)) : ?>
			<div class="embed-cpi-inner">
				<?php echo $content; ?>
			</div>
		<?php else : ?>
			<div class="embed-cpi-fallback">
				<iframe src="<?php echo esc_url($remote_url); ?>" width="100%" height="1200" frameborder="0" scrolling="no"></iframe>
			</div>
		<?php endif; ?>
	</main>
</div>

<style>
.container,
.embed-cpi-content {
	max-width: 100vw;
	overflow-x: hidden;
}
.embed-cpi-inner img {
	max-width: 100%;
	height: auto;
}
.embed-cpi-inner iframe,
.embed-cpi-inner video,
.embed-cpi-inner embed {
	max-width: 100%;
}
.embed-cpi-fallback {
	width: 100%;
	overflow: hidden;
}
.embed-cpi-fallback iframe {
	width: 100%;
	min-height: 80vh;
	border: 0;
	/* Tentativa de esconder o header no iframe via negative margin caso seja usado o fallback */
	margin-top: -120px;
}
/* Bloco de perfis (markup Divi raspado do antigo) */
.embed-cpi-inner [class*="lightbox-trigger-"] {
	cursor: pointer;
}
.embed-cpi-inner .et_pb_team_member {
	display: inline-block;
	vertical-align: top;
	max-width: 200px;
	margin: 0 1rem 1.5rem;
	text-align: center;
}
.embed-cpi-inner .et_pb_member_social_links {
	display: none; /* links placeholder "#" do Divi */
}
.embed-cpi-inner .et_pb_button_wrapper {
	text-align: center;
}
.embed-cpi-inner .et_pb_button {
	display: inline-block;
	padding: .4rem 1.2rem;
	border: 1px solid currentColor;
	border-radius: 3px;
	font-size: .8rem;
	text-decoration: none;
	text-transform: uppercase;
}
/* Conteúdo dos modais fica escondido no fluxo da página (o JS abre uma cópia em overlay) */
.embed-cpi-inner [class*="lightbox-content-"] {
	display: none;
}
/* Modal de perfis (controlado por embed-cpi-modal.js) */
.embed-cpi-modal {
	position: fixed;
	inset: 0;
	z-index: 99999;
	background: rgba(0, 0, 0, .75);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
}
.embed-cpi-modal__panel {
	position: relative;
	background: #fff;
	color: #222;
	width: 100%;
	max-width: 640px;
	max-height: 85vh;
	overflow-y: auto;
	padding: 2.5rem 2rem 2rem;
	border-radius: 4px;
}
.embed-cpi-modal__close {
	position: absolute;
	top: .4rem;
	right: .75rem;
	background: none;
	border: 0;
	font-size: 2rem;
	line-height: 1;
	cursor: pointer;
	color: #222;
}

/* ===== Leak guards =====
 * O CSS do site antigo (Divi) é global: os guards abaixo restauram a
 * tipografia do tema novo no chrome (header/footer) desta página e
 * reaplicam a tipografia Divi dentro do embed. Especificidade baixa via
 * :where() para não vencer regras de classe do tema nem do Divi. */
.page-cpi-da-covid {
	font-family: "Manrope", sans-serif;
	font-size: 16px;
	line-height: 1.42857143;
	color: #333;
}
:where(.main-header, .main-footer) a {
	color: #337ab7;
	text-decoration: none;
}
:where(.main-header, .main-footer) a:hover,
:where(.main-header, .main-footer) a:focus {
	color: #23527c;
}
:where(.main-header, .main-footer) p {
	padding-bottom: 0; /* reset do Divi p{padding-bottom:1em} */
}
:where(.main-header, .main-footer) :is(h1, h2, h3, h4, h5, h6) {
	font-family: "Manrope", sans-serif;
	font-weight: 800;
	line-height: 1.15;
	padding-bottom: 0; /* reset do Divi h1..h6{padding-bottom:10px} */
	color: var(--wp--preset--color--primary-dark);
}
:where(.main-header, .main-footer) :is(input, textarea, select) {
	font-family: inherit; /* customizer do antigo aplica Source Sans Pro */
}
/* Tipografia do antigo mantida dentro do conteúdo raspado (o guard do
 * body acima remove o Source Sans Pro herdado). */
.embed-cpi-inner {
	font-family: "Source Sans Pro", Helvetica, Arial, Lucida, sans-serif;
	font-size: 16px;
	line-height: 1.8em;
	color: #000;
}
:where(.embed-cpi-inner) :is(h1, h2, h3, h4, h5, h6) {
	font-family: "Droid Serif", Georgia, "Times New Roman", serif;
}

/* ===== Estados que o JS do Divi controlava no site antigo =====
 * O custom.js + waypoints.min.js do Divi revelavam .et-waypoint e
 * .et_animated ao rolar a página; sem eles, o CSS do próprio Divi
 * (.et-waypoint{opacity:0} / .et_animated{opacity:0}) deixa 88 avatares
 * e 5 módulos de texto invisíveis para sempre. Revela direto (o fade do
 * antigo é decorativo; aqui a prioridade é o conteúdo aparecer).
 * O escopo do modal cobre os clones abertos a partir de blocos escondidos. */
.embed-cpi-inner .et-waypoint,
.embed-cpi-inner .et_animated,
.embed-cpi-modal .et-waypoint,
.embed-cpi-modal .et_animated {
	opacity: 1 !important;
	animation: none !important;
}
/* Substituto do fitvids: vídeo do módulo et_pb_video fluido (é um iframe
 * do YouTube com width/height fixos no HTML raspado). */
.embed-cpi-inner .et_pb_video_box iframe {
	display: block;
	width: 100%;
	height: auto;
	aspect-ratio: 16 / 9;
}
/* Menu hamburguer das fullwidth menus do Divi: abaixo de 980px o CSS delas
 * esconde nav+ul e só o JS delas reexibia. O estado aberto é alternado por
 * embed-cpi-modal.js (classe menu-opened no contêiner). */
@media (max-width: 980px) {
	.embed-cpi-inner .et_pb_fullwidth_menu.menu-opened .fullwidth-menu-nav,
	.embed-cpi-inner .et_pb_fullwidth_menu.menu-opened .fullwidth-menu {
		display: block;
	}
	.embed-cpi-inner .et_pb_fullwidth_menu.menu-opened .fullwidth-menu > li {
		display: block;
		padding-right: 0;
	}
	.embed-cpi-inner .et_pb_fullwidth_menu .mobile_nav.opened .mobile_menu_bar:before {
		content: "\4d"; /* ícone de fechar da fonte ETModules, como no antigo */
	}
}

/* ===== Variante mídia do modal (imagens / vídeos / iframes) ===== */
.embed-cpi-modal__panel--media {
	background: transparent;
	padding: 0;
	max-width: min(1200px, 95vw);
	overflow: visible;
}
.embed-cpi-modal__panel--media .embed-cpi-modal__close {
	top: -2.4rem;
	right: 0;
	color: #fff;
	text-shadow: 0 0 4px rgba(0, 0, 0, .8);
}
.embed-cpi-modal__media {
	display: block;
	max-width: 100%;
	max-height: 85vh;
	margin: 0 auto;
	background: #000;
	border-radius: 4px;
}
.embed-cpi-modal__panel--media iframe.embed-cpi-modal__media,
.embed-cpi-modal__panel--media video.embed-cpi-modal__media {
	width: 100%;
	aspect-ratio: 16 / 9;
	max-height: 85vh;
	height: auto;
	border: 0;
}
</style>

<?php get_footer(); ?>
