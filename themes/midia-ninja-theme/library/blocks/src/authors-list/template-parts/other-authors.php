<?php

$last_authors = $args['latest'];

$args = [
	'post_type'      => 'guest-author',
	'posts_per_page' => 200,
	'orderby'        => 'title',
	'order'          => 'ASC',
	'meta_query'     => [
		[
			'key'     => 'colunista',
			'value'   => 1,
			'compare' => '='
		],
	],
	'fields' => 'ids'
];

$authors = get_posts( $args );

?>

<?php foreach ( $authors as $author ) :
	$user_login = get_post_meta( $author, 'cap-user_login', true );
	if ( ! in_array( $author, $last_authors ) && count_guest_author_posts( $user_login ) ) :
		$display_name = get_post_meta( $author, 'cap-display_name', true );
		$thumbnail    = ( has_post_thumbnail( $author ) ) ? get_the_post_thumbnail( $author ) : '<img src="' . get_stylesheet_directory_uri() . '/assets/images/default-image.png">';
		$user_login   = get_post_meta( $author, 'cap-user_login', true ); ?>

		<a class="authors-list-block__author" href="<?= get_author_posts_url( $author, $user_login ) ?>">
			<?php echo $thumbnail; ?>
			<p><?php echo apply_filters( 'the_title', $display_name ); ?></p>
		</a>
	<?php endif; ?>
<?php endforeach; ?>
