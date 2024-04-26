<?php
$args = [
	'echo'                    => false,
	'number'                  => 999,
	'authors_with_posts_only' => true,
	'orderby'                 => 'name'
];

$authors = coauthors_get_users( $args );

if ( ! empty( $authors ) ): ?>

    <h2>Mais colunistas NINJA</h2>

    <div class="related">
        <?php foreach( $authors as $author ) :
			$name = $author->display_name;
			$permalink = get_author_posts_url( $author->ID, $author->user_nicename );
			$thumbnail = coauthors_get_avatar( $author, 170 );

			if ( ! empty( $name ) ): ?>
            <div class="related-post">
                <a class="related-post-image" href="<?php echo $permalink; ?>"><?php echo $thumbnail; ?></a>

                <div class="related-post-content">
                    <div class="info">
                        <a href="<?php echo $permalink; ?>">
                            <h5><?php echo esc_html( $name ); ?></h5>
                        </a>
                    </div>
                </div>
            </div>
			<?php endif; ?>
        <?php endforeach; ?>
    </div>

<?php endif;
wp_reset_postdata(); ?>
