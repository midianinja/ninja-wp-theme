<?php
/**
 * Template part for displaying a pagination
 */

$arrow_icon = file_get_contents( get_template_directory() . '/assets/images/menu-arrow.svg' );

if ( $arrow_icon ) {
	the_posts_pagination(
		array(
			'mid_size'  => 2,
			'prev_text' => $arrow_icon,
			'next_text' => $arrow_icon
		)
	);
}