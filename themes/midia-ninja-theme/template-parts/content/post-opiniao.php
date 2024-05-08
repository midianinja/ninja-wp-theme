<?php

$coauthors = get_coauthors();
$get_coauthors = [];

$has_columnist = false;

foreach( $coauthors as $coauthor ):
    $coauthor_data = array();

    $coauthor_data['author_id'] = '';
    $coauthor_data['colunista'] = '';
    if (is_a($coauthor, 'WP_User')) {
        $coauthor_data['author_id'] = $coauthor->data->ID;
        $coauthor_data['author_name'] = $coauthor->data->display_name;
        $coauthor_data['userdata'] = get_userdata( $coauthor_data['author_id'] );
    } else {
        $coauthor_data['author_id'] = $coauthor->ID;
        $coauthor_data['colunista'] = get_post_meta($coauthor_data['author_id'], 'colunista', true);
        if( !$has_columnist && $coauthor_data['colunista'] == '1' ){
            $has_columnist = true;
        }
    }
    $get_coauthors[] = $coauthor_data;
endforeach;


?>
<a class="post-card post-card-opiniao" href="<?php the_permalink(); ?>">

    <div class="post-card--thumb post-opiniao">

		<?php if ($get_coauthors[0]['colunista']): ?>
			<?php echo get_avatar($get_coauthors[0]['author_id'], 70);?>
        <?php elseif (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('medium'); ?>
        <?php else : ?>
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/default-image.png" alt="<?php the_title(); ?>">
        <?php endif; ?>

    </div><!-- /.post-card--thumb -->

    <div class="post-card--content">
        <h5 class="entry-title"><?php the_title(); ?></h5>

        <div class="card-author">
            <?php the_author();?>
        </div>
    </div><!-- /.post-card--content -->


</a>
