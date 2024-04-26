<?php

$author = $args['author'];

$query = new WP_Query( [
	'post_type' => 'opiniao',
	'posts_per_page' => 3,
	'author_name' => $author->user_nicename, // Compatible to Guest Author
] );
$posts = $query->posts;
wp_reset_query();
?>

<div class="authors-list-block__featured-author">
	<div class="authors-list-block__featured-avatar">
		<a href="/author/<?= $author->user_nicename ?>">
			<?= coauthors_get_avatar( $author, 170 ) ?>
			<p><?= $author->display_name ?></p>
		</a>
	</div>
	<div class="authors-list-block__featured-posts">
	<?php foreach ( $posts as $post ): ?>
		<article class="authors-list-block__featured-post">
			<a href="<?= get_the_permalink( $post->ID ) ?>">
				<time datetime="<?= get_the_date( 'c', $post->ID ) ?>"><?= get_the_date( 'd \d\e F \d\e Y', $post->ID ) ?></time>
				<h3><?= apply_filters( 'the_title', $post->post_title ) ?></h3>
				<p><?= get_the_excerpt( $post->ID ) ?></p>
			</a>
		</article>
	<?php endforeach; ?>
	</div>
	<div class="authors-list-block__featured-link">
		<a href="/author/<?= $author->user_nicename ?>"><?= __( 'See all columns', 'ninja' ) ?></a>
	</div>
</div>
