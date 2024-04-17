<a href="<?php echo get_permalink();?>">
    <div class="post">

		<div class="post-thumbnail">
			<?= get_avatar( get_the_author_meta( 'ID' ), 76 ); ?>
		</div>

        <div class="post-content">
            <h3 class="post-title"><?php echo apply_filters('the_title', $args['post']->post_title); ?></h3>

            <div class="post-meta">
				<div class="post-author">
					<?php echo get_the_author(); ?>
				</div>
            </div>
        </div>
    </div>
</a>
