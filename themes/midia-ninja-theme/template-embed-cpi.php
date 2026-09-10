<?php
/**
 * Template Name: Embed CPI da Covid
 */

$remote_url = 'https://antigo.midianinja.org/cpi-da-covid/';
$cache_key  = 'embed_cpi_cache_' . md5($remote_url);

// ?embed_cpi_bust=1 como administrador invalida o cache manualmente.
if (isset($_GET['embed_cpi_bust']) && current_user_can('edit_pages')) {
	delete_transient($cache_key);
}

$content          = get_transient($cache_key);
$embed_cpi_status = null;

if (empty($content)) {
	$headers = [
		// UA identificável: facilita allowlist/firewall no site de origem.
		'User-Agent' => 'NinjaEmbed/1.0 (sindicação de conteúdo próprio)',
	];

	// A origem está atrás de Basic Auth (Traefik). A credencial mora apenas no
	// wp-config.php de cada ambiente: define('NINJA_CPI_BASIC_AUTH', 'user:pass');
	if (defined('NINJA_CPI_BASIC_AUTH') && NINJA_CPI_BASIC_AUTH) {
		$headers['Authorization'] = 'Basic ' . base64_encode(NINJA_CPI_BASIC_AUTH);
	}

	$response = wp_remote_get($remote_url, [
		'timeout'    => 30,
		'headers'    => $headers,
		'user-agent' => 'NinjaEmbed/1.0 (sindicação de conteúdo próprio)',
	]);

	if (is_wp_error($response)) {
		error_log(sprintf('[embed-cpi] requisição falhou para %s: %s', $remote_url, $response->get_error_message()));
	}

	if (!is_wp_error($response)) {
		$embed_cpi_status = wp_remote_retrieve_response_code($response);
	}

	if (!is_wp_error($response) && $embed_cpi_status === 200) {
		$html = wp_remote_retrieve_body($response);

		$dom = new DOMDocument();
		libxml_use_internal_errors(true);
		// mb_convert_encoding() para HTML-ENTITIES foi depreciado no PHP 8.1.
		// Preferência: mb_encode_numericentity() (requer ext-mbstring);
		// fallback: declaração de encoding XML, que o libxml respeita ao parsear.
		if (function_exists('mb_encode_numericentity')) {
			$html = mb_encode_numericentity($html, [0x80, 0x10FFFF, 0, 0x1FFFFF], 'UTF-8');
			$dom->loadHTML($html);
		} else {
			$dom->loadHTML('<?xml encoding="utf-8" ?>' . $html);
		}
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
			foreach (['src', 'href', 'data-src', 'data-href', 'action'] as $attr) {
				$content = str_replace(
					[$attr . '="/', $attr . "='/"],
					[$attr . '="' . $base_url . '/', $attr . "='" . $base_url . '/'],
					$content
				);
			}
			// srcset é uma lista de URLs separadas por vírgula: resolve apenas o início (após a aspa).
			$content = preg_replace('/(srcset=["\'])\//', '$1' . $base_url . '/', $content);

			// Remove TODOS os scripts inline do conteúdo raspado (o antigo ligava os
			// lightboxes via jQuery/Magnific Popup, que não existem neste tema; o modal
			// é reimplementado em embed-cpi-modal.js, enfileirado em library/assets.php).
			$content = preg_replace('/<script\b[^>]*>.*?<\/script>/is', '', $content);

			set_transient($cache_key, $content, HOUR_IN_SECONDS);
		} else {
			error_log(sprintf('[embed-cpi] nenhum seletor encontrou conteúdo em %s', $remote_url));
		}
	} elseif (!is_wp_error($response)) {
		error_log(sprintf('[embed-cpi] resposta inesperada de %s: HTTP %d', $remote_url, $embed_cpi_status));
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
			<?php
			// Fallback honesto: o iframe para a mesma origem não resolve nada (a origem
			// exige Basic Auth). Quem edita a página vê o diagnóstico; visitante comum,
			// nada — em vez de um iframe morto.
			if (current_user_can('edit_pages')) :
				$message = is_wp_error($response ?? null)
					? sprintf('erro de requisição: %s', $response->get_error_message())
					: sprintf('HTTP %s', $embed_cpi_status ?? 'desconhecido');
				?>
				<div class="embed-cpi-fallback embed-cpi-fallback--admin">
					<p><strong>Embed CPI indisponível</strong> — a origem respondeu <?php echo esc_html($message); ?>.</p>
					<p>Verifique a credencial <code>NINJA_CPI_BASIC_AUTH</code> (formato <code>user:pass</code>) no <code>wp-config.php</code> deste ambiente.</p>
				</div>
			<?php endif; ?>
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
