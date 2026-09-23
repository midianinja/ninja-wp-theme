<?php
/**
 * Template Name: Embed CPI da Covid
 */

$remote_url = 'https://antigo.midianinja.org/cpi-da-covid/';
$cache_key  = 'embed_cpi_cache_' . md5($remote_url);
$content    = get_transient($cache_key);

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
</style>

<?php get_footer(); ?>
