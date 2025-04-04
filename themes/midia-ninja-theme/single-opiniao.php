<?php

/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

gt_set_post_view();
get_header();
get_template_part('template-parts/header-especiais');

$category = get_the_terms($post->ID, 'category');
$coauthors = get_coauthors();
$get_coauthors = [];
$date = get_the_date();

$has_columnist = false;

foreach ($coauthors as $coauthor) :
	$coauthor_data = array();

	$coauthor_data['author_id'] = '';
	$coauthor_data['author_bio'] = '';;
	$coauthor_data['instagram'] = '';
	$coauthor_data['facebook'] = '';
	$coauthor_data['twitter'] = '';
	$coauthor_data['youtube'] = '';
	$coauthor_data['tik-tok'] = '';
	$coauthor_data['colunista'] = '';
	if (is_a($coauthor, 'WP_User')) {
		$coauthor_data['author_id'] = $coauthor->data->ID;
		$coauthor_data['author_name'] = $coauthor->data->display_name;
		$coauthor_data['userdata'] = get_userdata($coauthor_data['author_id']);
		$coauthor_data['author_bio'] = isset($userdata->user_description) ? $userdata->user_description : '';
		$coauthor_data['instagram'] = pods_field('user', $coauthor_data['author_id'], 'instagram', true);
		$coauthor_data['facebook'] = pods_field('user', $coauthor_data['author_id'], 'facebook', true);
		$coauthor_data['twitter'] = pods_field('user', $coauthor_data['author_id'], 'twitter', true);
	} else {
		$coauthor_data['author_id'] = $coauthor->ID;
		$coauthor_data['author_bio'] = $coauthor->description;
		$coauthor_data['author_name'] = $coauthor->display_name;
		$coauthor_data['cap-instagram'] = get_post_meta($coauthor_data['author_id'], 'cap-instagram', true);
		$coauthor_data['cap-facebook'] = get_post_meta($coauthor_data['author_id'], 'cap-facebook', true);
		$coauthor_data['cap-twitter'] = get_post_meta($coauthor_data['author_id'], 'cap-twitter', true);
		$coauthor_data['cap-youtube'] = get_post_meta($coauthor_data['author_id'], 'cap-youtube', true);
		$coauthor_data['cap-tik-tok'] = get_post_meta($coauthor_data['author_id'], 'cap-tik-tok', true);
		$coauthor_data['colunista'] = get_post_meta($coauthor_data['author_id'], 'colunista', true);
		$coauthor_data['cap-user_login'] = get_post_meta($coauthor_data['author_id'], 'cap-user_login', true);
		$coauthor_data['author_url'] = get_author_posts_url($coauthor_data['author_id']);

		if (!$has_columnist && $coauthor_data['colunista'] == '1') {
			$has_columnist = true;
		}
	}
	$get_coauthors[] = $coauthor_data;
endforeach;

$container_class = $has_columnist ? 'container has-columnist' : 'container';
$has_thumbnail = (has_post_thumbnail() && get_post_meta(get_the_ID(), '_show_thumbnail', true) === '1') ? true : false;
?>

<div class="<?php echo $container_class ?>" id="single-opiniao">
	<main class="content">
		<?php while (have_posts()) : the_post(); ?>
			<article class="post">
				<header class="post-header <?php echo $has_thumbnail ? 'has-thumbnail' : ''; ?>">
					<div class="post-info">
						<?php if ($has_thumbnail) : ?>
							<div class="post-thumbnail">
								<?php the_post_thumbnail(); ?>

								<?php if ($caption = get_the_post_thumbnail_caption()) : ?>
									<figcaption><?php echo esc_attr($caption); ?></figcaption>
								<?php endif; ?>
							</div>
						<?php else : ?>
							<div class="post-date">
								<?php echo $date; ?>
							</div>

							<h2 class="title"><?php the_title(); ?></h2>

							<h5 class="excerpt"><?php the_excerpt(); ?></h5>

							<!-- <div class="text-player">
								<?php echo do_shortcode('[tta_listen_btn listen_text="Ouvir"]'); ?>
							</div> -->
						<?php endif; ?>

						<div class="author-info-mobile">
							<?php foreach ($get_coauthors as $coauthor) : ?>

								<?php if ($coauthor['colunista'] == '1') : ?>
									<div class="author-info-card">
										<div class="info-container">
											<a href="<?php echo get_author_posts_url($coauthor['author_id'], $coauthor_data['cap-user_login']); ?>">

												<?php echo get_avatar($coauthor['author_id'], 128); ?>
											</a>

											<div class="info-card-informations">
												<a href="<?php echo get_author_posts_url($coauthor['author_id'], $coauthor_data['cap-user_login']); ?>">

													<div class="author-name">
														<?php echo $coauthor['author_name']; ?>
													</div>
												</a>
												<div class="social-networks">
													<?php if ($coauthor['cap-instagram']) : ?>
														<span class="cap-instagram">
															<a href="<?php echo $coauthor['cap-instagram']; ?>">
																<svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
																	<path d="M14.8241 0.437256C7.04497 0.437256 0.738281 6.74395 0.738281 14.5231C0.738281 22.3022 7.04497 28.6089 14.8241 28.6089C22.6033 28.6089 28.91 22.3022 28.91 14.5231C28.91 6.74395 22.6033 0.437256 14.8241 0.437256ZM14.8241 27.5298C7.64673 27.5264 1.83086 21.7005 1.83422 14.5231C1.83758 7.3457 7.66354 1.52983 14.8409 1.53319C22.0183 1.53655 27.8342 7.36251 27.8308 14.5399C27.8308 16.3754 27.4409 18.1908 26.6845 19.865C24.5834 24.5311 19.9407 27.5298 14.8241 27.5298Z" fill="white" />
																	<path d="M19.1539 6.89859H10.494C8.72235 6.88178 7.27006 8.30045 7.24316 10.0721V18.9842C7.26333 20.7592 8.71898 22.1779 10.4906 22.1577H19.1405C20.9155 22.1779 22.3678 20.7592 22.3913 18.9842V10.0721C22.3712 8.30045 20.9222 6.88178 19.1539 6.89859ZM21.097 18.9842C21.097 20.023 20.2566 20.8634 19.2212 20.8634C19.1976 20.8634 19.1775 20.8634 19.1539 20.8634H10.494C9.45857 20.9004 8.58787 20.0902 8.55089 19.0514C8.55089 19.0279 8.55089 19.0077 8.55089 18.9842V10.0721C8.55089 9.03331 9.39134 8.19287 10.4268 8.19287C10.4503 8.19287 10.4705 8.19287 10.494 8.19287H19.1439C20.1793 8.15589 21.05 8.96608 21.087 10.0049C21.087 10.0284 21.087 10.0486 21.087 10.0721L21.097 18.9842Z" fill="white" />
																	<path d="M14.8239 10.5596C12.6354 10.5596 10.8604 12.3346 10.8604 14.5231C10.8604 16.7116 12.6354 18.4866 14.8239 18.4866C17.0124 18.4866 18.7874 16.7116 18.7874 14.5231C18.7874 12.3346 17.0124 10.5596 14.8239 10.5596ZM14.8239 17.1352C13.3615 17.1352 12.1748 15.9485 12.1748 14.4861C12.1748 13.0238 13.3615 11.837 14.8239 11.837C16.2863 11.837 17.473 13.0238 17.473 14.4861C17.473 14.4996 17.473 14.5097 17.473 14.5231C17.4662 15.9821 16.2863 17.1655 14.8239 17.1722V17.1352Z" fill="white" />
																	<path d="M19.0767 11.2924C19.591 11.2924 20.0079 10.8754 20.0079 10.3611C20.0079 9.84685 19.591 9.42993 19.0767 9.42993C18.5624 9.42993 18.1455 9.84685 18.1455 10.3611C18.1455 10.8754 18.5624 11.2924 19.0767 11.2924Z" fill="white" />
																</svg>
															</a>
														</span>
													<?php endif; ?>
													<?php if ($coauthor['cap-twitter']) : ?>
														<span class="twitter">
															<a href="<?php echo $coauthor['cap-twitter']; ?>">
																<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
																	<path d="M28.6031 10.0878C31.0956 17.7498 26.9043 25.9793 19.2422 28.4718C11.5802 30.9643 3.35069 26.773 0.858168 19.111C-1.63435 11.4489 2.55697 3.21941 10.219 0.726891C11.6776 0.253452 13.2024 0.00976562 14.7341 0.00976562C21.0524 0.0132468 26.6502 4.07926 28.6031 10.0878ZM14.7376 1.32565C7.40625 1.33609 1.47085 7.28541 1.48129 14.6202C1.49173 21.9551 7.44106 27.887 14.7759 27.8765C22.1072 27.8661 28.0426 21.9168 28.0322 14.5819C28.0287 13.193 27.8094 11.8144 27.3812 10.4951C25.5988 5.01917 20.492 1.3152 14.7376 1.32565Z" fill="white" />
																	<path d="M6.73092 7.07715L12.9378 15.3763L6.69263 22.1263H8.09902L13.5679 16.2187L17.9856 22.1263H22.7687L16.2102 13.3607L22.0237 7.08063H20.6173L15.587 12.5182L11.5175 7.07715H6.73092ZM8.79874 8.11106H10.9954L20.7009 21.0889H18.5042L8.79874 8.11106Z" fill="white" />
																</svg>
															</a>
														</span>
													<?php endif; ?>
													<?php if ($coauthor['cap-facebook']) : ?>
														<span class="facebook">
															<a href="<?php echo $coauthor['cap-facebook']; ?>">
																<svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
																	<path d="M28.1474 10.163C30.5544 17.5623 26.5068 25.5095 19.1075 27.9165C11.7083 30.3236 3.76103 26.276 1.354 18.8767C-1.05303 11.4775 2.99455 3.53023 10.3938 1.12319C11.8024 0.665993 13.2749 0.430664 14.754 0.430664C20.8557 0.434026 26.2614 4.36058 28.1474 10.163ZM14.754 1.70142C7.67414 1.7115 1.94231 7.45678 1.95239 14.54C1.96248 21.6199 7.70776 27.3518 14.791 27.3417C21.8709 27.3316 27.6027 21.5863 27.5927 14.5031C27.5893 13.1617 27.3775 11.8305 26.964 10.5563C25.2461 5.26826 20.3144 1.69133 14.754 1.70142Z" fill="white" />
																	<path fill-rule="evenodd" clip-rule="evenodd" d="M17.0567 9.66558C17.5173 9.66558 17.9947 9.66558 18.4384 9.66558H18.6267V7.272C18.3813 7.272 18.1291 7.21485 17.8669 7.19804C17.3963 7.19804 16.929 7.19804 16.4583 7.19804C15.7456 7.19467 15.0531 7.41319 14.4682 7.8166C13.8193 8.29397 13.389 9.01003 13.2747 9.80677C13.2209 10.1228 13.1907 10.4422 13.1806 10.7649C13.1806 11.2994 13.1806 11.8339 13.1806 12.3718V12.6441H10.8979V15.31H13.1604V22.0067H15.9776V15.2831H18.2401L18.5124 12.6441H15.8835C15.8835 12.6441 15.8835 11.3196 15.8835 10.7649C15.9574 9.91771 16.4281 9.68239 17.0567 9.66558Z" fill="white" />
																</svg>
															</a>
														</span>
													<?php endif; ?>

													<?php if ($coauthor['cap-youtube']) : ?>
														<span class="youtube">
															<a href="<?php echo  $coauthor['cap-youtube']; ?>">
																<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M28.6031 10.0878C31.0956 17.7498 26.9043 25.9793 19.2422 28.4718C11.5802 30.9643 3.35069 26.773 0.858168 19.111C-1.63435 11.4489 2.55697 3.21941 10.219 0.726891C11.6776 0.253452 13.2024 0.00976562 14.7341 0.00976562C21.0524 0.0132468 26.6502 4.07926 28.6031 10.0878ZM14.7376 1.32565C7.40625 1.33609 1.47085 7.28541 1.48129 14.6202C1.49173 21.9551 7.44106 27.887 14.7759 27.8765C22.1072 27.8661 28.0426 21.9168 28.0322 14.5819C28.0287 13.193 27.8094 11.8144 27.3812 10.4951C25.5988 5.01917 20.492 1.3152 14.7376 1.32565Z" fill="white" />
																	<path d="M13.2 17.2857L17.871 14.5L13.2 11.7143V17.2857ZM23.604 10.015C23.721 10.4514 23.802 11.0364 23.856 11.7793C23.919 12.5221 23.946 13.1629 23.946 13.72L24 14.5C24 16.5336 23.856 18.0286 23.604 18.985C23.379 19.8207 22.857 20.3593 22.047 20.5914C21.624 20.7121 20.85 20.7957 19.662 20.8514C18.492 20.9164 17.421 20.9443 16.431 20.9443L15 21C11.229 21 8.88 20.8514 7.953 20.5914C7.143 20.3593 6.621 19.8207 6.396 18.985C6.279 18.5486 6.198 17.9636 6.144 17.2207C6.081 16.4779 6.054 15.8371 6.054 15.28L6 14.5C6 12.4664 6.144 10.9714 6.396 10.015C6.621 9.17929 7.143 8.64071 7.953 8.40857C8.376 8.28786 9.15 8.20429 10.338 8.14857C11.508 8.08357 12.579 8.05571 13.569 8.05571L15 8C18.771 8 21.12 8.14857 22.047 8.40857C22.857 8.64071 23.379 9.17929 23.604 10.015Z" fill="white" />
																</svg>
															</a>
														</span>
													<?php endif; ?>
													<?php if ($coauthor['cap-tik-tok']) : ?>
														<span class="tik-tok">
															<a href="<?php echo  $coauthor['cap-tik-tok']; ?>">
																<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M28.6031 10.0878C31.0956 17.7498 26.9043 25.9793 19.2422 28.4718C11.5802 30.9643 3.35069 26.773 0.858168 19.111C-1.63435 11.4489 2.55697 3.21941 10.219 0.726891C11.6776 0.253452 13.2024 0.00976562 14.7341 0.00976562C21.0524 0.0132468 26.6502 4.07926 28.6031 10.0878ZM14.7376 1.32565C7.40625 1.33609 1.47085 7.28541 1.48129 14.6202C1.49173 21.9551 7.44106 27.887 14.7759 27.8765C22.1072 27.8661 28.0426 21.9168 28.0322 14.5819C28.0287 13.193 27.8094 11.8144 27.3812 10.4951C25.5988 5.01917 20.492 1.3152 14.7376 1.32565Z" fill="white" />
																	<path d="M19.0578 9.50667C18.4502 8.813 18.1153 7.92216 18.1156 7H15.3689V18.0222C15.3477 18.6187 15.0959 19.1837 14.6665 19.5982C14.237 20.0127 13.6635 20.2444 13.0667 20.2444C11.8044 20.2444 10.7556 19.2133 10.7556 17.9333C10.7556 16.4044 12.2311 15.2578 13.7511 15.7289V12.92C10.6844 12.5111 8 14.8933 8 17.9333C8 20.8933 10.4533 23 13.0578 23C15.8489 23 18.1156 20.7333 18.1156 17.9333V12.3422C19.2293 13.1421 20.5665 13.5712 21.9378 13.5689V10.8222C21.9378 10.8222 20.2667 10.9022 19.0578 9.50667Z" fill="white" />
																</svg>
															</a>
														</span>
													<?php endif; ?>
												</div>
											</div>


										</div>
										<?php if ($coauthor['author_bio']) : ?>
											<div class="authbio">
												<?php echo $coauthor['author_bio']; ?>
											</div>
										<?php endif; ?>
									</div>
								<?php endif; ?>
							<?php endforeach; ?>
						</div>

						<div class="content-author">

							<div>
								<?php foreach ($get_coauthors as $coauthor) : ?>

									<?php if ($coauthor) : ?>

										<?php echo get_avatar($coauthor['author_id'], 70); ?>

									<?php endif; ?>
								<?php endforeach; ?>

								<div class="author">
									<div class="byline">
										<span><?php _e('By', 'ninja'); ?></span>
										<?php the_author(); ?>
									</div>

									<time class="date" datetime="<?php echo get_the_date('c'); ?>">
										<span>
											<?php echo $date; ?>
										</span>
										<span class="clock"></span>
										<span>
											<?php the_time('G:i'); ?>
										</span>
									</time>
								</div>
							</div>

							<div class="page-share">
								<span><?php _e('Share:', 'ninja'); ?></span>
								<div class="social-icons">
									<?php the_social_networks_menu() ?>
									<?php echo do_shortcode('[addtoany]'); ?>
								</div>


							</div>
						</div>


					</div>
					<div class="author-info">
						<?php foreach ($get_coauthors as $coauthor) : ?>

							<?php if ($coauthor['colunista'] == '1') : ?>

								<div class="author-info-card">
									<a href="<?php echo get_author_posts_url($coauthor['author_id'], $coauthor_data['cap-user_login']); ?>">

										<?php echo get_avatar($coauthor['author_id'], 128); ?>
									</a>
									<?php if ($coauthor['author_name']) : ?>
										<a href="<?php echo get_author_posts_url($coauthor['author_id'], $coauthor_data['cap-user_login']); ?>">
											<div class="author-name">
												<?php echo $coauthor['author_name']; ?>
											</div>
										</a>
									<?php endif; ?>

									<?php if ($coauthor['author_bio']) : ?>
										<a href="<?php echo get_author_posts_url($coauthor['author_id'], $coauthor_data['cap-user_login']); ?>">
											<div class="authbio">
												<?php echo $coauthor['author_bio']; ?>
											</div>
										</a>
									<?php endif; ?>
									<div class="social-networks">

										<?php if ($coauthor['cap-instagram']) : ?>
											<span class="instagram">
												<a href="<?php echo $coauthor['cap-instagram']; ?>">
													<svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
														<path d="M14.8241 0.437256C7.04497 0.437256 0.738281 6.74395 0.738281 14.5231C0.738281 22.3022 7.04497 28.6089 14.8241 28.6089C22.6033 28.6089 28.91 22.3022 28.91 14.5231C28.91 6.74395 22.6033 0.437256 14.8241 0.437256ZM14.8241 27.5298C7.64673 27.5264 1.83086 21.7005 1.83422 14.5231C1.83758 7.3457 7.66354 1.52983 14.8409 1.53319C22.0183 1.53655 27.8342 7.36251 27.8308 14.5399C27.8308 16.3754 27.4409 18.1908 26.6845 19.865C24.5834 24.5311 19.9407 27.5298 14.8241 27.5298Z" fill="white" />
														<path d="M19.1539 6.89859H10.494C8.72235 6.88178 7.27006 8.30045 7.24316 10.0721V18.9842C7.26333 20.7592 8.71898 22.1779 10.4906 22.1577H19.1405C20.9155 22.1779 22.3678 20.7592 22.3913 18.9842V10.0721C22.3712 8.30045 20.9222 6.88178 19.1539 6.89859ZM21.097 18.9842C21.097 20.023 20.2566 20.8634 19.2212 20.8634C19.1976 20.8634 19.1775 20.8634 19.1539 20.8634H10.494C9.45857 20.9004 8.58787 20.0902 8.55089 19.0514C8.55089 19.0279 8.55089 19.0077 8.55089 18.9842V10.0721C8.55089 9.03331 9.39134 8.19287 10.4268 8.19287C10.4503 8.19287 10.4705 8.19287 10.494 8.19287H19.1439C20.1793 8.15589 21.05 8.96608 21.087 10.0049C21.087 10.0284 21.087 10.0486 21.087 10.0721L21.097 18.9842Z" fill="white" />
														<path d="M14.8239 10.5596C12.6354 10.5596 10.8604 12.3346 10.8604 14.5231C10.8604 16.7116 12.6354 18.4866 14.8239 18.4866C17.0124 18.4866 18.7874 16.7116 18.7874 14.5231C18.7874 12.3346 17.0124 10.5596 14.8239 10.5596ZM14.8239 17.1352C13.3615 17.1352 12.1748 15.9485 12.1748 14.4861C12.1748 13.0238 13.3615 11.837 14.8239 11.837C16.2863 11.837 17.473 13.0238 17.473 14.4861C17.473 14.4996 17.473 14.5097 17.473 14.5231C17.4662 15.9821 16.2863 17.1655 14.8239 17.1722V17.1352Z" fill="white" />
														<path d="M19.0767 11.2924C19.591 11.2924 20.0079 10.8754 20.0079 10.3611C20.0079 9.84685 19.591 9.42993 19.0767 9.42993C18.5624 9.42993 18.1455 9.84685 18.1455 10.3611C18.1455 10.8754 18.5624 11.2924 19.0767 11.2924Z" fill="white" />
													</svg>
												</a>
											</span>
										<?php endif; ?>

										<?php if ($coauthor['cap-twitter']) : ?>
											<span class="twitter">
												<a href="<?php echo $coauthor['cap-twitter']; ?>">
													<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
														<path d="M28.6031 10.0878C31.0956 17.7498 26.9043 25.9793 19.2422 28.4718C11.5802 30.9643 3.35069 26.773 0.858168 19.111C-1.63435 11.4489 2.55697 3.21941 10.219 0.726891C11.6776 0.253452 13.2024 0.00976562 14.7341 0.00976562C21.0524 0.0132468 26.6502 4.07926 28.6031 10.0878ZM14.7376 1.32565C7.40625 1.33609 1.47085 7.28541 1.48129 14.6202C1.49173 21.9551 7.44106 27.887 14.7759 27.8765C22.1072 27.8661 28.0426 21.9168 28.0322 14.5819C28.0287 13.193 27.8094 11.8144 27.3812 10.4951C25.5988 5.01917 20.492 1.3152 14.7376 1.32565Z" fill="white" />
														<path d="M6.73092 7.07715L12.9378 15.3763L6.69263 22.1263H8.09902L13.5679 16.2187L17.9856 22.1263H22.7687L16.2102 13.3607L22.0237 7.08063H20.6173L15.587 12.5182L11.5175 7.07715H6.73092ZM8.79874 8.11106H10.9954L20.7009 21.0889H18.5042L8.79874 8.11106Z" fill="white" />
													</svg>
												</a>
											</span>
										<?php endif; ?>
										<?php if ($coauthor['cap-facebook']) : ?>
											<span class="cap-facebook">
												<a href="<?php echo $coauthor['facebook']; ?>">
													<svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
														<path d="M28.1474 10.163C30.5544 17.5623 26.5068 25.5095 19.1075 27.9165C11.7083 30.3236 3.76103 26.276 1.354 18.8767C-1.05303 11.4775 2.99455 3.53023 10.3938 1.12319C11.8024 0.665993 13.2749 0.430664 14.754 0.430664C20.8557 0.434026 26.2614 4.36058 28.1474 10.163ZM14.754 1.70142C7.67414 1.7115 1.94231 7.45678 1.95239 14.54C1.96248 21.6199 7.70776 27.3518 14.791 27.3417C21.8709 27.3316 27.6027 21.5863 27.5927 14.5031C27.5893 13.1617 27.3775 11.8305 26.964 10.5563C25.2461 5.26826 20.3144 1.69133 14.754 1.70142Z" fill="white" />
														<path fill-rule="evenodd" clip-rule="evenodd" d="M17.0567 9.66558C17.5173 9.66558 17.9947 9.66558 18.4384 9.66558H18.6267V7.272C18.3813 7.272 18.1291 7.21485 17.8669 7.19804C17.3963 7.19804 16.929 7.19804 16.4583 7.19804C15.7456 7.19467 15.0531 7.41319 14.4682 7.8166C13.8193 8.29397 13.389 9.01003 13.2747 9.80677C13.2209 10.1228 13.1907 10.4422 13.1806 10.7649C13.1806 11.2994 13.1806 11.8339 13.1806 12.3718V12.6441H10.8979V15.31H13.1604V22.0067H15.9776V15.2831H18.2401L18.5124 12.6441H15.8835C15.8835 12.6441 15.8835 11.3196 15.8835 10.7649C15.9574 9.91771 16.4281 9.68239 17.0567 9.66558Z" fill="white" />
													</svg>
												</a>
											</span>
										<?php endif; ?>
										<?php if ($coauthor['cap-youtube']) : ?>
											<span class="youtube">
												<a href="<?php echo  $coauthor['cap-youtube']; ?>">
													<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M28.6031 10.0878C31.0956 17.7498 26.9043 25.9793 19.2422 28.4718C11.5802 30.9643 3.35069 26.773 0.858168 19.111C-1.63435 11.4489 2.55697 3.21941 10.219 0.726891C11.6776 0.253452 13.2024 0.00976562 14.7341 0.00976562C21.0524 0.0132468 26.6502 4.07926 28.6031 10.0878ZM14.7376 1.32565C7.40625 1.33609 1.47085 7.28541 1.48129 14.6202C1.49173 21.9551 7.44106 27.887 14.7759 27.8765C22.1072 27.8661 28.0426 21.9168 28.0322 14.5819C28.0287 13.193 27.8094 11.8144 27.3812 10.4951C25.5988 5.01917 20.492 1.3152 14.7376 1.32565Z" fill="white" />
														<path d="M13.2 17.2857L17.871 14.5L13.2 11.7143V17.2857ZM23.604 10.015C23.721 10.4514 23.802 11.0364 23.856 11.7793C23.919 12.5221 23.946 13.1629 23.946 13.72L24 14.5C24 16.5336 23.856 18.0286 23.604 18.985C23.379 19.8207 22.857 20.3593 22.047 20.5914C21.624 20.7121 20.85 20.7957 19.662 20.8514C18.492 20.9164 17.421 20.9443 16.431 20.9443L15 21C11.229 21 8.88 20.8514 7.953 20.5914C7.143 20.3593 6.621 19.8207 6.396 18.985C6.279 18.5486 6.198 17.9636 6.144 17.2207C6.081 16.4779 6.054 15.8371 6.054 15.28L6 14.5C6 12.4664 6.144 10.9714 6.396 10.015C6.621 9.17929 7.143 8.64071 7.953 8.40857C8.376 8.28786 9.15 8.20429 10.338 8.14857C11.508 8.08357 12.579 8.05571 13.569 8.05571L15 8C18.771 8 21.12 8.14857 22.047 8.40857C22.857 8.64071 23.379 9.17929 23.604 10.015Z" fill="white" />
													</svg>
												</a>
											</span>
										<?php endif; ?>
										<?php if ($coauthor['cap-tik-tok']) : ?>
											<span class="tik-tok">
												<a href="<?php echo  $coauthor['cap-tik-tok']; ?>">
													<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M28.6031 10.0878C31.0956 17.7498 26.9043 25.9793 19.2422 28.4718C11.5802 30.9643 3.35069 26.773 0.858168 19.111C-1.63435 11.4489 2.55697 3.21941 10.219 0.726891C11.6776 0.253452 13.2024 0.00976562 14.7341 0.00976562C21.0524 0.0132468 26.6502 4.07926 28.6031 10.0878ZM14.7376 1.32565C7.40625 1.33609 1.47085 7.28541 1.48129 14.6202C1.49173 21.9551 7.44106 27.887 14.7759 27.8765C22.1072 27.8661 28.0426 21.9168 28.0322 14.5819C28.0287 13.193 27.8094 11.8144 27.3812 10.4951C25.5988 5.01917 20.492 1.3152 14.7376 1.32565Z" fill="white" />
														<path d="M19.0578 9.50667C18.4502 8.813 18.1153 7.92216 18.1156 7H15.3689V18.0222C15.3477 18.6187 15.0959 19.1837 14.6665 19.5982C14.237 20.0127 13.6635 20.2444 13.0667 20.2444C11.8044 20.2444 10.7556 19.2133 10.7556 17.9333C10.7556 16.4044 12.2311 15.2578 13.7511 15.7289V12.92C10.6844 12.5111 8 14.8933 8 17.9333C8 20.8933 10.4533 23 13.0578 23C15.8489 23 18.1156 20.7333 18.1156 17.9333V12.3422C19.2293 13.1421 20.5665 13.5712 21.9378 13.5689V10.8222C21.9378 10.8222 20.2667 10.9022 19.0578 9.50667Z" fill="white" />
													</svg>
												</a>
											</span>
										<?php endif; ?>
									</div>
								</div>
							<?php endif; ?>
						<?php endforeach; ?>
					</div>
				</header>

				<section class="post-content">
					<?php if ($has_thumbnail) : ?>
						<header>
							<div class="post-date">
								<?php echo $date; ?>
							</div>
							<h2 class="title"><?php the_title(); ?></h2>
							<h5 class="excerpt header-post-content"><?php the_excerpt(); ?></h5>
						</header>
					<?php endif; ?>
					<?php get_template_part('./template-parts/content/player-elevenlabs.php');
					?>
					<?php the_content(); ?>

					<div class="page-share">
						<?php echo do_shortcode('[addtoany]'); ?>
					</div>

					<div class="comments">

					</div>
				</section>
			</article>
		<?php endwhile; ?>

		<section class="post-footer">
			<div class="related-posts">
				<?php get_template_part('template-parts/content/related-posts-colunistas'); ?>
			</div>
		</section>
	</main>

</div>

<?php get_footer(); ?>
