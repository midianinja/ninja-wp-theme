<?php
$opinion = $args['post'];
$authors = get_coauthors( $opinion->ID );
$author = $authors[0];
?>
<a class="post" href="<?= get_permalink() ?>">
	<div class="post-thumbnail">
		<?= coauthors_get_avatar( $author, 76 ) ?>
	</div>

	<div class="post-content">
		<h3 class="post-title"><?= apply_filters( 'the_title', $opinion->post_title ) ?></h3>

		<div class="post-meta">
			<div class="post-author">
				<?= $author->display_name ?>
			</div>
		</div>
	</div>
</a>
