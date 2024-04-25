<a href="<?php echo get_permalink();?>">
    <div class="post">
        <div class="post-thumbnail">
            <?php $main_category = get_primary_term( $args['post']->ID, 'category' ); ?>
			<?php if( ! empty( $main_category ) ): ?>
				<div class="post--terms">
					<ul class="list-terms tax-category">
						<li class="category-<?php echo $main_category->slug; ?>"><?php echo $main_category->name; ?></li>
					</ul>
				</div>
            <?php endif; ?>
            <?php if ( has_post_thumbnail() ) : ?>
                <?php echo get_the_post_thumbnail( $args['post']->ID, 'medium' ); ?>
            <?php else : ?>
                <img src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/default-image.png" height="600" width="800">
            <?php endif; ?>
        </div>
        <div class="post-content">
            <h2 class="post-title"><?php echo apply_filters( 'the_title', $args['post']->post_title ); ?></h2>

            <div class="post-meta">
                <span class="post-meta--date"><?php echo get_the_date(); ?></span>
            </div>
        </div>
    </div>
</a>
