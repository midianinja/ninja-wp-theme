<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

gt_set_post_view();
get_header();

$category = get_the_terms($post->ID, 'category');
$coauthors = get_coauthors();
$cat_id = $category[0]->term_id;

$cor_font = get_term_meta ( $cat_id, 'ninja_font_term_color', true );
$cor_fundo = get_term_meta ( $cat_id, 'ninja_background_term_color', true );

get_template_part( 'template-parts/header-especiais' );
?>

<div class="container">
    <main class="content">
        <?php while (have_posts()) : the_post(); ?>
            <article class="post">
                <header class="post-header">
                    <div class="post-info">
                        <div>
                            <div class="info">
                                <span class="term-<?= $category[0]->slug; ?>">
                                    <?php
                                    $categories = get_the_category();

                                    foreach ($categories as $category){
                                    echo '<a style="color:' .  $cor_font . '; background-color:' .  $cor_fundo . ';" href="' . get_category_link($category->term_id) . '">' . $category->cat_name . '</a>';

                                    }; ?>
                                </span>
                            </div>

                            <?php the_post_thumbnail();?>
                        </div>

                        <h2 class="title"><?php the_title(); ?></h2>

                        <h5 class="excerpt"><?php the_excerpt(); ?></h5>

                        <div class="author-info-mobile">
                        <?php foreach($coauthors as $coauthor): ?>
                            <?php
                            $author_id = '';
                            $author_bio = '';
                            $instagram = '';

                            if (is_a($coauthor, 'WP_User')) {
                                $author_id = $coauthor->data->ID;
                                $userdata = get_userdata($author_id);
                                $author_bio = isset($userdata->user_description) ? $userdata->user_description : '';
                                $instagram = pods_field('user', $author_id, 'instagram', true);
                                $facebook = pods_field('user', $author_id, 'facebook', true);
                                $twitter = pods_field('user', $author_id, 'twitter', true);
                            } else {
                                $author_id = $coauthor->ID;
                                $author_bio = $coauthor->description;
                                $instagram = get_coauthors_meta('instagram', $coauthor->ID, true);
                                $facebook = get_coauthors_meta('facebook', $coauthor->ID, true);
                                $twitter = get_coauthors_meta('twitter', $coauthor->ID, true);
                            }

                            $terms = get_the_terms(get_the_ID(), 'marcador_afluente');

                            if ($terms && !is_wp_error($terms)) {
                                foreach ($terms as $term) {
                                    $afluente_name = $term->name;
                                    
                                    if ($afluente_name) {
                                    ?>
                                            <div class="author-info-card">

                                                <?php echo get_avatar($author_id, 128);?>

                                                <div class="auth-name-icons">

                                                    <div class="authname">
                                                        <?php the_author(); ?>
                                                    </div>

                                                    <hr>

                                                    <div class="social-networks">
                                                        <?php if($instagram): ?>
                                                        <span class="instagram">
                                                            <a href="<?php echo $instagram; ?>">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                                                <path d="M14.8241 0.0148926C7.04497 0.0148926 0.738281 6.32158 0.738281 14.1007C0.738281 21.8799 7.04497 28.1866 14.8241 28.1866C22.6033 28.1866 28.91 21.8799 28.91 14.1007C28.91 6.32158 22.6033 0.0148926 14.8241 0.0148926ZM14.8241 27.1074C7.64673 27.1041 1.83086 21.2781 1.83422 14.1007C1.83758 6.92334 7.66354 1.10747 14.8409 1.11083C22.0183 1.11419 27.8342 6.94015 27.8308 14.1175C27.8308 15.9531 27.4409 17.7684 26.6845 19.4426C24.5834 24.1087 19.9407 27.1074 14.8241 27.1074Z" fill="white"/>
                                                                <path d="M19.1539 6.47622H10.494C8.72235 6.45941 7.27006 7.87808 7.24316 9.64974V18.5618C7.26333 20.3368 8.71898 21.7555 10.4906 21.7353H19.1405C20.9155 21.7555 22.3678 20.3368 22.3913 18.5618V9.64974C22.3712 7.87808 20.9222 6.45941 19.1539 6.47622ZM21.097 18.5618C21.097 19.6006 20.2566 20.441 19.2212 20.441C19.1976 20.441 19.1775 20.441 19.1539 20.441H10.494C9.45857 20.478 8.58787 19.6678 8.55089 18.629C8.55089 18.6055 8.55089 18.5853 8.55089 18.5618V9.64974C8.55089 8.61095 9.39134 7.77051 10.4268 7.77051C10.4503 7.77051 10.4705 7.77051 10.494 7.77051H19.1439C20.1793 7.73353 21.05 8.54372 21.087 9.5825C21.087 9.60604 21.087 9.62621 21.087 9.64974L21.097 18.5618Z" fill="white"/>
                                                                <path d="M14.8239 10.1372C12.6354 10.1372 10.8604 11.9122 10.8604 14.1007C10.8604 16.2893 12.6354 18.0643 14.8239 18.0643C17.0124 18.0643 18.7874 16.2893 18.7874 14.1007C18.7874 11.9122 17.0124 10.1372 14.8239 10.1372ZM14.8239 16.7128C13.3615 16.7128 12.1748 15.5261 12.1748 14.0638C12.1748 12.6014 13.3615 11.4147 14.8239 11.4147C16.2863 11.4147 17.473 12.6014 17.473 14.0638C17.473 14.0772 17.473 14.0873 17.473 14.1007C17.4662 15.5598 16.2863 16.7431 14.8239 16.7498V16.7128Z" fill="white"/>
                                                                <path d="M19.0767 10.87C19.591 10.87 20.0079 10.4531 20.0079 9.93878C20.0079 9.42449 19.591 9.00757 19.0767 9.00757C18.5624 9.00757 18.1455 9.42449 18.1455 9.93878C18.1455 10.4531 18.5624 10.87 19.0767 10.87Z" fill="white"/>
                                                            </svg>
                                                            </a>
                                                        </span>
                                                        <?php endif; ?>
                                                        <?php if($facebook): ?>
                                                        <span class="facebook">
                                                            <a href="<?php echo $facebook; ?>">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                                                <path d="M28.1474 9.74065C30.5544 17.1399 26.5068 25.0871 19.1075 27.4942C11.7083 29.9012 3.76103 25.8536 1.354 18.4544C-1.05303 11.0551 2.99455 3.10786 10.3938 0.700831C11.8024 0.243629 13.2749 0.00830078 14.754 0.00830078C20.8557 0.0116626 26.2614 3.93822 28.1474 9.74065ZM14.754 1.27905C7.67414 1.28914 1.94231 7.03441 1.95239 14.1177C1.96248 21.1976 7.70776 26.9294 14.791 26.9193C21.8709 26.9092 27.6027 21.164 27.5927 14.0807C27.5893 12.7393 27.3775 11.4081 26.964 10.134C25.2461 4.8459 20.3144 1.26897 14.754 1.27905Z" fill="white"/>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0572 9.24322C17.5178 9.24322 17.9951 9.24322 18.4389 9.24322H18.6272V6.84963C18.3818 6.84963 18.1296 6.79248 17.8674 6.77567C17.3967 6.77567 16.9295 6.77567 16.4588 6.77567C15.7461 6.77231 15.0536 6.99083 14.4686 7.39424C13.8198 7.87161 13.3895 8.58767 13.2752 9.38441C13.2214 9.70042 13.1912 10.0198 13.1811 10.3425C13.1811 10.877 13.1811 11.4116 13.1811 11.9494V12.2218H10.8984V14.8876H13.1609V21.5843H15.9781V14.8607H18.2406L18.5129 12.2218H15.884C15.884 12.2218 15.884 10.8972 15.884 10.3425C15.9579 9.49535 16.4286 9.26002 17.0572 9.24322Z" fill="white"/>
                                                            </svg>
                                                            </a>
                                                        </span>
                                                        <?php endif; ?>
                                                        <?php if($twitter): ?>
                                                        <span class="twitter">
                                                            <a href="<?php echo $twitter; ?>">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                                <path d="M28.6031 10.0878C31.0956 17.7498 26.9043 25.9793 19.2422 28.4718C11.5802 30.9643 3.35069 26.773 0.858168 19.111C-1.63435 11.4489 2.55697 3.21941 10.219 0.726891C11.6776 0.253452 13.2024 0.00976562 14.7341 0.00976562C21.0524 0.0132468 26.6502 4.07926 28.6031 10.0878ZM14.7376 1.32565C7.40625 1.33609 1.47085 7.28541 1.48129 14.6202C1.49173 21.9551 7.44106 27.887 14.7759 27.8765C22.1072 27.8661 28.0426 21.9168 28.0322 14.5819C28.0287 13.193 27.8094 11.8144 27.3812 10.4951C25.5988 5.01917 20.492 1.3152 14.7376 1.32565Z" fill="white"/>
                                                                <path d="M6.73068 7.07715L12.9376 15.3763L6.69238 22.1263H8.09878L13.5677 16.2187L17.9853 22.1263H22.7684L16.2099 13.3607L22.0235 7.08063H20.6171L15.5868 12.5182L11.5173 7.07715H6.73068ZM8.79849 8.11106H10.9951L20.7006 21.0889H18.504L8.79849 8.11106Z" fill="white"/>
                                                            </svg>
                                                            </a>
                                                        </span>
                                                        <?php endif; ?>

                                                    </div>

                                                </div>

                                                </div>
                                        <?php 
                                        break;
                                    }
                                } 
                            } 
                            ?>
                        <?php endforeach; ?>
                            </div>

                            <div class="content-author">

                            <div>
                                <?php echo get_avatar(get_the_author_meta('ID'), 70);?>

                                <div class="author">
                                    <div class="byline">
                                        <span><?php _e('By', 'ninja');?></span>
                                        <?php the_author(); ?>
                                    </div>

                                    <time class="date" datetime="<?php echo get_the_date('c'); ?>">
                                        <span>
                                            <?php the_date();?>
                                        </span>
                                        <span class="clock"></span>
                                        <span>
                                            <?php the_time('G:i');?>
                                        </span>
                                    </time>
                                </div>
                            </div>

                            <div class="page-share">
                                <span><?php _e('Share:', 'ninja');?></span>
                                <div class="social-icons">
                                    <?php the_social_networks_menu() ?>
                                    <?php echo do_shortcode('[addtoany]'); ?>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="author-info">
                        <?php foreach($coauthors as $coauthor): ?>
                            <?php
                            $author_id = '';
                            $author_bio = '';
                            $instagram = '';

                            if (is_a($coauthor, 'WP_User')) {
                                $author_id = $coauthor->data->ID;
                                $userdata = get_userdata($author_id);
                                $author_bio = isset($userdata->user_description) ? $userdata->user_description : '';
                                $instagram = pods_field('user', $author_id, 'instagram', true);
                                $facebook = pods_field('user', $author_id, 'facebook', true);
                                $twitter = pods_field('user', $author_id, 'twitter', true);
                            } else {
                                $author_id = $coauthor->ID;
                                $author_bio = $coauthor->description;
                                $instagram = get_coauthors_meta('instagram', $coauthor->ID, true);
                                $facebook = get_coauthors_meta('facebook', $coauthor->ID, true);
                                $twitter = get_coauthors_meta('twitter', $coauthor->ID, true);
                            }

                            $terms = get_the_terms(get_the_ID(), 'marcador_afluente');

                            if ($terms && !is_wp_error($terms)) {
                                foreach ($terms as $term) {
                                    $afluente_name = $term->name;
                                    
                                    if ($afluente_name) {
                                    ?>
                                        <div class="author-info-card">
                                            <?php echo get_avatar($author_id, 128);?>
                                            
                                            <div class="authname">
                                                <?php the_author(); ?>
                                            </div>

                                            <hr>
                                            
                                            <?php if($author_bio): ?>
                                                <div class="authbio">
                                                    <?php echo $author_bio; ?>
                                                </div>
                                            <?php endif; ?>

                                            <div class="social-networks">
                                                <?php if($instagram): ?>
                                                    <span class="instagram">
                                                        <a href="<?php echo $instagram; ?>">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                                                <path d="M14.8241 0.0148926C7.04497 0.0148926 0.738281 6.32158 0.738281 14.1007C0.738281 21.8799 7.04497 28.1866 14.8241 28.1866C22.6033 28.1866 28.91 21.8799 28.91 14.1007C28.91 6.32158 22.6033 0.0148926 14.8241 0.0148926ZM14.8241 27.1074C7.64673 27.1041 1.83086 21.2781 1.83422 14.1007C1.83758 6.92334 7.66354 1.10747 14.8409 1.11083C22.0183 1.11419 27.8342 6.94015 27.8308 14.1175C27.8308 15.9531 27.4409 17.7684 26.6845 19.4426C24.5834 24.1087 19.9407 27.1074 14.8241 27.1074Z" fill="white"/>
                                                                <path d="M19.1539 6.47622H10.494C8.72235 6.45941 7.27006 7.87808 7.24316 9.64974V18.5618C7.26333 20.3368 8.71898 21.7555 10.4906 21.7353H19.1405C20.9155 21.7555 22.3678 20.3368 22.3913 18.5618V9.64974C22.3712 7.87808 20.9222 6.45941 19.1539 6.47622ZM21.097 18.5618C21.097 19.6006 20.2566 20.441 19.2212 20.441C19.1976 20.441 19.1775 20.441 19.1539 20.441H10.494C9.45857 20.478 8.58787 19.6678 8.55089 18.629C8.55089 18.6055 8.55089 18.5853 8.55089 18.5618V9.64974C8.55089 8.61095 9.39134 7.77051 10.4268 7.77051C10.4503 7.77051 10.4705 7.77051 10.494 7.77051H19.1439C20.1793 7.73353 21.05 8.54372 21.087 9.5825C21.087 9.60604 21.087 9.62621 21.087 9.64974L21.097 18.5618Z" fill="white"/>
                                                                <path d="M14.8239 10.1372C12.6354 10.1372 10.8604 11.9122 10.8604 14.1007C10.8604 16.2893 12.6354 18.0643 14.8239 18.0643C17.0124 18.0643 18.7874 16.2893 18.7874 14.1007C18.7874 11.9122 17.0124 10.1372 14.8239 10.1372ZM14.8239 16.7128C13.3615 16.7128 12.1748 15.5261 12.1748 14.0638C12.1748 12.6014 13.3615 11.4147 14.8239 11.4147C16.2863 11.4147 17.473 12.6014 17.473 14.0638C17.473 14.0772 17.473 14.0873 17.473 14.1007C17.4662 15.5598 16.2863 16.7431 14.8239 16.7498V16.7128Z" fill="white"/>
                                                                <path d="M19.0767 10.87C19.591 10.87 20.0079 10.4531 20.0079 9.93878C20.0079 9.42449 19.591 9.00757 19.0767 9.00757C18.5624 9.00757 18.1455 9.42449 18.1455 9.93878C18.1455 10.4531 18.5624 10.87 19.0767 10.87Z" fill="white"/>
                                                            </svg>
                                                        </a>
                                                    </span>
                                                <?php endif; ?>
                                                <?php if($facebook): ?>
                                                    <span class="facebook">
                                                        <a href="<?php echo $facebook; ?>">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                                                <path d="M28.1474 9.74065C30.5544 17.1399 26.5068 25.0871 19.1075 27.4942C11.7083 29.9012 3.76103 25.8536 1.354 18.4544C-1.05303 11.0551 2.99455 3.10786 10.3938 0.700831C11.8024 0.243629 13.2749 0.00830078 14.754 0.00830078C20.8557 0.0116626 26.2614 3.93822 28.1474 9.74065ZM14.754 1.27905C7.67414 1.28914 1.94231 7.03441 1.95239 14.1177C1.96248 21.1976 7.70776 26.9294 14.791 26.9193C21.8709 26.9092 27.6027 21.164 27.5927 14.0807C27.5893 12.7393 27.3775 11.4081 26.964 10.134C25.2461 4.8459 20.3144 1.26897 14.754 1.27905Z" fill="white"/>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0572 9.24322C17.5178 9.24322 17.9951 9.24322 18.4389 9.24322H18.6272V6.84963C18.3818 6.84963 18.1296 6.79248 17.8674 6.77567C17.3967 6.77567 16.9295 6.77567 16.4588 6.77567C15.7461 6.77231 15.0536 6.99083 14.4686 7.39424C13.8198 7.87161 13.3895 8.58767 13.2752 9.38441C13.2214 9.70042 13.1912 10.0198 13.1811 10.3425C13.1811 10.877 13.1811 11.4116 13.1811 11.9494V12.2218H10.8984V14.8876H13.1609V21.5843H15.9781V14.8607H18.2406L18.5129 12.2218H15.884C15.884 12.2218 15.884 10.8972 15.884 10.3425C15.9579 9.49535 16.4286 9.26002 17.0572 9.24322Z" fill="white"/>
                                                            </svg>
                                                        </a>
                                                    </span>
                                                <?php endif; ?>
                                                <?php if($twitter): ?>
                                                    <span class="twitter">
                                                        <a href="<?php echo $twitter; ?>">
                                                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                                <path d="M28.6031 10.0878C31.0956 17.7498 26.9043 25.9793 19.2422 28.4718C11.5802 30.9643 3.35069 26.773 0.858168 19.111C-1.63435 11.4489 2.55697 3.21941 10.219 0.726891C11.6776 0.253452 13.2024 0.00976562 14.7341 0.00976562C21.0524 0.0132468 26.6502 4.07926 28.6031 10.0878ZM14.7376 1.32565C7.40625 1.33609 1.47085 7.28541 1.48129 14.6202C1.49173 21.9551 7.44106 27.887 14.7759 27.8765C22.1072 27.8661 28.0426 21.9168 28.0322 14.5819C28.0287 13.193 27.8094 11.8144 27.3812 10.4951C25.5988 5.01917 20.492 1.3152 14.7376 1.32565Z" fill="white"/>
                                                                <path d="M6.73068 7.07715L12.9376 15.3763L6.69238 22.1263H8.09878L13.5677 16.2187L17.9853 22.1263H22.7684L16.2099 13.3607L22.0235 7.08063H20.6171L15.5868 12.5182L11.5173 7.07715H6.73068ZM8.79849 8.11106H10.9951L20.7006 21.0889H18.504L8.79849 8.11106Z" fill="white"/>
                                                            </svg>
                                                        </a>
                                                    </span>
                                                <?php endif; ?>
                                            </div>
                                        </div>
                                        <?php 
                                        break;
                                    }
                                } 
                            } 
                            ?>
                        <?php endforeach; ?>
                    </div>
                </header>

                <section class="post-content">
                    <?php the_content(); ?>

                    <div class="page-share">
                        <?php echo do_shortcode('[addtoany]'); ?>
                        <?php the_social_networks_menu() ?>
                    </div>

                </section>
            </article>
        <?php endwhile; ?>

        <section class="post-footer">
            <div class="related-posts">
                <?php get_template_part('./template-parts/content/related-posts'); ?>
            </div>
        </section>
    </main>

</div>

<?php get_footer(); ?>
