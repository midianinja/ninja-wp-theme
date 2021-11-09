<?php
/**
 * The template for displaying all single posts
 */

gt_set_post_view();

get_header(); 

?>
    
<div class="container single" id="single">

    <div class="content" id="content">

        <div class="post" id="post">
            
            <div class="post-header">
                
                <div class="info">

                    <span class="category"><?php the_category(', '); ?></span>

                </div>    
                
                <div class="title">
                    <h4> <?php the_title(); ?> </h4>
                </div>
                
                
                <div class="data">
                    <?php the_date(); ?>
                </div>
                
            </div>

            <div class="post-content">
                <?php the_content(); ?>
            </div>

            <div class="post-footer">

                <div class="post-footer-tags">
                    <?php echo get_html_terms( get_the_ID(), 'post_tag', true ); ?>                    
                </div>

                <div class="post-footer-share">
                    <h6>Compartilhar</h6>

                    <div class="social-media">

                        <a href="https://www.facebook.com/sharer/sharer.php?u=<?= get_the_permalink() ?>" target="_blank"><i class="fab fa-facebook-square"></i></a>
                        <a href="whatsapp://send?text=<?= (get_the_title().' - '.get_the_permalink()) ?>" target="_blank" class="hide-for-large"><i class="fab fa-whatsapp"></i></a>
                        <a href="https://api.whatsapp.com/send?text=<?= (get_the_title().' - '.get_the_permalink()) ?>" class="show-for-large" target="_blank"><i class="fab fa-whatsapp"></i></a>
                        <a href="https://telegram.me/share/url?url=<?= get_the_title().' - '.get_the_permalink() ?>" target="_blank"><i class="fab fa-telegram-plane"></i></a>
                        
                        <input type="text" style="display: none;" id="url" value="<?= get_the_permalink() ?>" />
                        <a href="" class="copy" url="<?= get_the_permalink() ?>"> <i class="fas fa-link"></i> </a>
                        <span id="alert" class="hide"> </span>

                    </div>

                </div>

                <div class="post-footer-views">
                    <p> <?= gt_get_post_view(); ?> </p>
                </div>

            </div>

        </div>

        <?php get_template_part( 'template-parts/content/related-posts' ); ?>

    </div>

    <aside class="col-sm-3">
        <?php dynamic_sidebar( 'sidebar-posts' ) ?>
    </aside>

</div>

<?php get_footer();