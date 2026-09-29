<?php
/**
 * Card de Afluente — grade da archive de Afluentes.
 *
 * Dados:
 * - Nome: título do post do CPT `afluente`.
 * - Descrição curta: excerpt do post.
 * - Arte: imagem destacada (object-fit CONTAIN dentro da moldura colorida).
 * - Chip/moldura: cor vinda do sistema existente de cores por categoria
 *   (term meta `ninja_background_term_color` / `ninja_font_term_color`,
 *   ver library/categories.php), com os mesmos valores-padrão do tema.
 * - Redes: term meta (instagram/facebook/twitter/youtube/tiktok) do marcador
 *   do afluente (taxonomia `marcador_afluente`), mesmo padrão do single.
 *
 * @package ninja
 */

$afluente_category_terms = get_the_terms( get_the_ID(), 'category' );
$afluente_category       = ( $afluente_category_terms && ! is_wp_error( $afluente_category_terms ) )
	? $afluente_category_terms[0]
	: false;

$afluente_bg = 'var(--wp--preset--color--highlight-pure)';
$afluente_fg = 'var(--wp--preset--color--primary-pure)';

if ( $afluente_category ) {
	$term_bg = get_term_meta( $afluente_category->term_id, 'ninja_background_term_color', true );
	$term_fg = get_term_meta( $afluente_category->term_id, 'ninja_font_term_color', true );

	if ( $term_bg ) {
		$sanitized_bg = sanitize_hex_color( $term_bg );
		if ( $sanitized_bg ) {
			$afluente_bg = $sanitized_bg;
		}
	}
	if ( $term_fg ) {
		$sanitized_fg = sanitize_hex_color( $term_fg );
		if ( $sanitized_fg ) {
			$afluente_fg = $sanitized_fg;
		}
	}
}

$afluente_marker = get_primary_afluente( get_the_ID() );
$afluente_networks = [];

if ( $afluente_marker ) {
	foreach ( [ 'instagram', 'facebook', 'twitter', 'youtube', 'tiktok' ] as $network ) {
		$network_url = get_term_meta( $afluente_marker->term_id, $network, true );
		if ( ! empty( $network_url ) ) {
			$afluente_networks[ $network ] = $network_url;
		}
	}
}
?>
<article id="afluente-<?php the_ID(); ?>" <?php post_class( 'card-afluente' ); ?> style="--afluente-color: <?php echo esc_attr( $afluente_bg ); ?>; --afluente-chip-color: <?php echo esc_attr( $afluente_fg ); ?>;">
	<div class="card-afluente__frame">
		<a href="<?php the_permalink(); ?>" class="card-afluente__frame-link" tabindex="-1" aria-hidden="true">
			<?php
			if ( has_post_thumbnail() ) {
				echo wp_get_attachment_image(
					get_post_thumbnail_id(),
					'medium',
					false,
					[
						'class' => 'card-afluente__art',
						'alt'   => get_the_title(),
					]
				);
			}
			?>
		</a>
	</div>

	<div class="card-afluente__content">
		<?php if ( $afluente_category ) : ?>
			<span class="card-afluente__chip"><?php echo esc_html( $afluente_category->name ); ?></span>
		<?php endif; ?>

		<h3 class="card-afluente__name">
			<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
		</h3>

		<div class="card-afluente__divider"></div>

		<?php if ( has_excerpt() ) : ?>
			<p class="card-afluente__description"><?php echo wp_kses_post( get_the_excerpt() ); ?></p>
		<?php endif; ?>

		<?php if ( ! empty( $afluente_networks ) ) : ?>
			<div class="card-afluente__socials">
				<?php foreach ( $afluente_networks as $network => $network_url ) : ?>
					<a
						class="card-afluente__social card-afluente__social--<?php echo esc_attr( $network ); ?>"
						href="<?php echo esc_url( $network_url ); ?>"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="<?php echo esc_attr( sprintf( __( '%s no %s', 'ninja' ), get_the_title(), ucfirst( $network ) ) ); ?>"
					>
						<?php if ( 'instagram' === $network ) : ?>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" fill="none" aria-hidden="true">
								<path fill="currentColor" d="M14.8241 0.437256C7.04497 0.437256 0.738281 6.74395 0.738281 14.5231C0.738281 22.3022 7.04497 28.6089 14.8241 28.6089C22.6033 28.6089 28.91 22.3022 28.91 14.5231C28.91 6.74395 22.6033 0.437256 14.8241 0.437256ZM14.8241 27.5298C7.64673 27.5264 1.83086 21.7005 1.83422 14.5231C1.83758 7.3457 7.66354 1.52983 14.8409 1.53319C22.0183 1.53655 27.8342 7.36251 27.8308 14.5399C27.8308 16.3754 27.4409 18.1908 26.6845 19.865C24.5834 24.5311 19.9407 27.5298 14.8241 27.5298Z"/>
								<path fill="currentColor" d="M19.1539 6.89859H10.494C8.72235 6.88178 7.27006 8.30045 7.24316 10.0721V18.9842C7.26333 20.7592 8.71898 22.1779 10.4906 22.1577H19.1405C20.9155 22.1779 22.3678 20.7592 22.3913 18.9842V10.0721C22.3712 8.30045 20.9226 6.88178 19.1539 6.89859ZM21.097 18.9842C21.097 20.023 20.2566 20.8634 19.2212 20.8634C19.1976 20.8634 19.1775 20.8634 19.1539 20.8634H10.494C9.45857 20.9004 8.58787 20.0902 8.55089 19.0514C8.55089 19.0279 8.55089 19.0077 8.55089 18.9842V10.0721C8.55089 9.03331 9.39134 8.19287 10.4268 8.19287C10.4503 8.19287 10.4705 8.19287 10.494 8.19287H19.1439C20.1793 8.15589 21.05 8.96608 21.087 10.0049C21.087 10.0284 21.087 10.0486 21.087 10.0721L21.097 18.9842Z"/>
								<path fill="currentColor" d="M14.8239 10.5596C12.6354 10.5596 10.8604 12.3346 10.8604 14.5231C10.8604 16.7116 12.6354 18.4866 14.8239 18.4866C17.0124 18.4866 18.7874 16.7116 18.7874 14.5231C18.7874 12.3346 17.0124 10.5596 14.8239 10.5596ZM14.8239 17.1352C13.3615 17.1352 12.1748 15.9485 12.1748 14.4861C12.1748 13.0238 13.3615 11.837 14.8239 11.837C16.2863 11.837 17.473 13.0238 17.473 14.4861C17.473 14.4996 17.473 14.5097 17.473 14.5231C14.8662 15.9821 15.7237 17.1655 14.8239 17.1722V17.1352Z"/>
								<path fill="currentColor" d="M19.0767 11.2924C19.591 11.2924 20.0079 10.8754 20.0079 10.3611C20.0079 9.84685 19.591 9.42993 19.0767 9.42993C18.5624 9.42993 18.1455 9.84685 18.1455 10.3611C18.1455 10.8754 18.5624 11.2924 19.0767 11.2924Z"/>
							</svg>
						<?php elseif ( 'twitter' === $network ) : ?>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none" aria-hidden="true">
								<path fill="currentColor" d="M28.6031 10.5101C31.0956 18.1722 26.9043 26.4017 19.2422 28.8942C11.5802 31.3867 3.35069 27.1954 0.858168 19.5333C-1.63435 11.8713 2.55697 3.64177 10.219 1.14925C11.6776 0.675815 13.2024 0.432129 14.7341 0.432129C21.0524 0.43561 26.6502 4.50162 28.6031 10.5101ZM14.7376 1.74801C7.40625 1.75845 1.47085 7.70778 1.48129 15.0426C1.49173 22.3774 7.44106 28.3093 14.7759 28.2989C22.1072 28.2885 28.0426 22.3391 28.0322 15.0043C28.0287 13.6153 27.8094 12.2368 27.3812 10.9174C25.5988 5.44154 20.4924 1.73757 14.7376 1.74801Z"/>
								<path fill="currentColor" d="M6.73116 7.49951L12.9381 15.7986L6.69287 22.5486H8.09927L13.5682 16.6411L17.9858 22.5486H22.7689L16.2104 13.783L22.0239 7.503H20.6176L15.5873 12.9406L11.5178 7.49951H6.73116ZM8.79898 8.53342H10.9956L20.7011 21.5112H18.5045L8.79898 8.53342Z"/>
							</svg>
						<?php elseif ( 'facebook' === $network ) : ?>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" fill="none" aria-hidden="true">
								<path fill="currentColor" d="M28.1474 10.163C30.5544 17.5623 26.5068 25.5095 19.1075 27.9165C11.7083 30.3236 3.76103 26.276 1.354 18.8767C-1.05303 11.4775 2.99455 3.53023 10.3938 1.12319C11.8024 0.665993 13.2749 0.430664 14.754 0.430664C20.8557 0.434026 26.2614 4.36058 28.1474 10.163ZM14.754 1.70142C7.67414 1.7115 1.94231 7.45678 1.95239 14.54C1.96248 21.6199 7.70776 27.3518 14.791 27.3417C21.8709 27.3316 27.6027 21.5863 27.5927 14.5031C27.5893 13.1617 27.3775 11.8305 26.964 10.5563C25.2461 5.26826 20.3144 1.69133 14.754 1.70142Z"/>
								<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M17.0567 9.66558C17.5173 9.66558 17.9947 9.66558 18.4384 9.66558H18.6267V7.272C18.3813 7.272 18.1291 7.21485 17.8669 7.19804C17.3963 7.19804 16.929 7.19804 16.4583 7.19804C15.7456 7.19467 15.0531 7.41319 14.4682 7.8166C13.8193 8.29397 13.389 9.01003 13.2747 9.80677C13.2209 10.1228 13.1907 10.4422 13.1806 10.7649C13.1806 11.2994 13.1806 11.8339 13.1806 12.3718V12.6441H10.8979V15.31H13.1604V22.0067H15.9776V15.2831H18.2401L18.5124 12.6441H15.8835C15.8835 12.6441 15.8835 11.3196 15.8835 10.7649C15.9574 9.91771 16.4281 9.68239 17.0567 9.66558Z"/>
							</svg>
						<?php elseif ( 'youtube' === $network ) : ?>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none" aria-hidden="true">
								<path fill="currentColor" d="M28.6031 10.0878C31.0956 17.7498 26.9043 25.9793 19.2422 28.4718C11.5802 30.9643 3.35069 26.773 0.858168 19.111C-1.63435 11.4489 2.55697 3.21941 10.219 0.726891C11.6776 0.253452 13.2024 0.00976562 14.7341 0.00976562C21.0524 0.0132468 26.6502 4.07926 28.6031 10.0878ZM14.7376 1.32565C7.40625 1.33609 1.47085 7.28541 1.48129 14.6202C1.49173 21.9551 7.44106 27.887 14.7759 27.8765C22.1072 27.8661 28.0426 21.9168 28.0322 14.5819C28.0287 13.193 27.8094 11.8144 27.3812 10.4951C25.5988 5.01917 20.4924 1.3152 14.7376 1.32565Z"/>
								<path fill="currentColor" d="M13.2 17.2857L17.871 14.5L13.2 11.7143V17.2857ZM23.604 10.015C23.721 10.4514 23.802 11.0364 23.856 11.7793C23.919 12.5221 23.946 13.1629 23.946 13.72L24 14.5C24 16.5336 23.856 18.0286 23.604 18.985C23.379 19.8207 22.857 20.3593 22.047 20.5914C21.624 20.7121 20.85 20.7957 19.662 20.8514C18.492 20.9164 17.421 20.9443 16.431 20.9443L15 21C11.229 21 8.88 20.8514 7.953 20.5914C7.143 20.3593 6.621 19.8207 6.396 18.985C6.279 18.5486 6.198 17.9636 6.144 17.2207C6.081 16.4779 6.054 15.8371 6.054 15.28L6 14.5C6 12.4664 6.144 10.9714 6.396 10.015C6.621 9.17929 7.143 8.64071 7.953 8.40857C8.376 8.28786 9.15 8.20457 10.338 8.14857C11.508 8.08343 12.579 8.05571 13.569 8.05571L15 8C18.771 8 21.12 8.14857 22.047 8.40857C22.857 8.64071 23.379 9.17929 23.604 10.015Z"/>
							</svg>
						<?php elseif ( 'tiktok' === $network ) : ?>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none" aria-hidden="true">
								<path fill="currentColor" d="M28.6031 10.0878C31.0956 17.7498 26.9043 25.9793 19.2422 28.4718C11.5802 30.9643 3.35069 26.773 0.858168 19.111C-1.63435 11.4489 2.55697 3.21941 10.219 0.726891C11.6776 0.253452 13.2024 0.00976562 14.7341 0.00976562C21.0524 0.0132468 26.6502 4.07926 28.6031 10.0878ZM14.7376 1.32565C7.40625 1.33609 1.47085 7.28541 1.48129 14.6202C1.49173 21.9551 7.44106 27.887 14.7759 27.8765C22.1072 27.8661 28.0426 21.9168 28.0322 14.5819C28.0287 13.193 27.8094 11.8144 27.3812 10.4951C25.5988 5.01917 20.4924 1.3152 14.7376 1.32565Z"/>
								<path fill="currentColor" d="M19.0578 9.50667C18.4502 8.813 18.1153 7.92216 18.1156 7H15.3689V18.0222C15.3477 18.6187 15.0959 19.1837 14.6665 19.5982C14.2372 20.0127 13.6635 20.2444 13.0667 20.2444C11.8044 20.2444 10.7556 19.2133 10.7556 17.9333C10.7556 16.4044 12.2311 15.2578 13.7511 15.7289V12.92C10.6844 12.5111 8 14.8933 8 17.9333C8 20.8933 10.4533 23 13.0578 23C15.8489 23 18.1156 20.7333 18.1156 17.9333V12.3422C19.2293 13.1421 20.5665 13.5712 21.9378 13.5689V10.8222C21.9378 10.8222 20.2667 10.902 19.0578 9.50667Z"/>
							</svg>
						<?php endif; ?>
					</a>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>
</article>
