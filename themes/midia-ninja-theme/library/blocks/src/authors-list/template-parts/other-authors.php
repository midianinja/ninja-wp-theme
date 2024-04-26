<?php

$last_authors = $args['latest'];

$authors = coauthors_get_users( [
	'echo' => false,
	'number' => 999,
	'authors_with_posts_only' => true,
	'orderby' => 'name',
] );

?>

<?php foreach ( $authors as $author ): ?>
	<?php if ( ! empty( $author->display_name ) && ! in_array( $author->ID, $last_authors ) ): ?>
		<a class="authors-list-block__author" href="<?= get_author_posts_url( $author->ID, $author->user_nicename ) ?>">
			<?= coauthors_get_avatar( $author, 170 ) ?>
			<p><?= $author->display_name ?></p>
		</a>
	<?php endif; ?>
<?php endforeach; ?>
