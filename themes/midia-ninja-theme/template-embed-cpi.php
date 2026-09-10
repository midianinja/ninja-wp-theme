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

			$base_url = 'https://antigo.midianinja.org';
			$content = str_replace(['src="/', "src='/"], 'src="' . $base_url . '/', $content);
			$content = str_replace(['href="/', "href='/"], 'href="' . $base_url . '/', $content);
			$content = str_replace("src='/" , "src='" . $base_url . "/", $content);
			$content = str_replace("href='/" , "href='" . $base_url . "/", $content);

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
</style>

<?php get_footer(); ?>
