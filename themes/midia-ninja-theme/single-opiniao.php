<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

gt_set_post_view();
get_header();
get_template_part( 'template-parts/header-especiais' );

$category = get_the_terms($post->ID, 'category');
$coauthors = get_coauthors();
$get_coauthors = [];

$has_columnist = false;

foreach( $coauthors as $coauthor ):
    $coauthor_data = array();

    $coauthor_data['author_id'] = '';
    $coauthor_data['author_bio'] = '';;
    $coauthor_data['instagram'] = '';
    $coauthor_data['facebook'] = '';
    $coauthor_data['twitter'] = '';
    $coauthor_data['colunista'] = '';
    if (is_a($coauthor, 'WP_User')) {
        $coauthor_data['author_id'] = $coauthor->data->ID;
        $coauthor_data['author_name'] = $coauthor->data->display_name;
        $coauthor_data['userdata'] = get_userdata( $coauthor_data['author_id'] );
        $coauthor_data['author_bio'] = isset( $userdata->user_description )? $userdata->user_description: '';
        $coauthor_data['instagram'] = pods_field( 'user', $author_id, 'instagram', true);
        $coauthor_data['facebook'] = pods_field( 'user', $coauthor_data['author_id'], 'facebook', true);
        $coauthor_data['twitter'] = pods_field( 'user', $coauthor_data['author_id'], 'twitter', true);
    } else {
        do_action( 'qm/debug', $coauthor );
        $coauthor_data['author_id'] = $coauthor->ID;
        $coauthor_data['author_bio'] = $coauthor->description;
        $coauthor_data['author_name'] = $coauthor->display_name;
        $coauthor_data['instagram'] = get_user_meta($coauthor_data['author_id'], 'instagram', true); 
        $coauthor_data['facebook'] = get_user_meta($coauthor_data['author_id'], 'facebook', true); 
        $coauthor_data['twitter'] = get_user_meta($coauthor_data['author_id'], 'twitter', true);
        $coauthor_data['colunista'] = get_post_meta($coauthor_data['author_id'], 'colunista', true);

        if( !$has_columnist && $coauthor_data['colunista'] == '1' ){
            $has_columnist = true;
        }
    }
    $get_coauthors[] = $coauthor_data;
endforeach;    

$container_class = $has_columnist ? 'container has-columnist' : 'container';
?>

<div class="<?php echo $container_class ?>" id="single-opiniao">
    <main class="content">
        <?php while (have_posts()) : the_post(); ?>
            <article class="post">
                <header class="post-header">
                    <div class="post-info">
                        <div class="date">
						 <?php the_date(); ?></p>
                            <?php the_post_thumbnail();?>
                        </div>

                        <h2 class="title"><?php the_title(); ?></h2>

                        <h5 class="excerpt"><?php the_excerpt(); ?></h5>

                        <div class="author-info-mobile">
                        <?php foreach( $get_coauthors as $coauthor ): ?>

                            <?php if ($coauthor['colunista'] == '1'): ?>
                                <div class="author-info-card">
                                    <div class="info-container">
                                        <?php echo get_avatar($coauthor['author_id'], 128);?>

                                        <div class="info-card-informations">
                                            <div class="author-name">
                                                <?php echo $coauthor['author_name']; ?>
                                            </div>
                                            <div class="social-networks">
                                            <?php if($coauthor['instagram']): ?>
                                            <span class="instagram">
                                                <a href="<?php echo $coauthor['instagram']; ?>">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                                        <path d="M14.8244 0.0148926C7.04522 0.0148926 0.738525 6.32158 0.738525 14.1007C0.738525 21.8799 7.04522 28.1866 14.8244 28.1866C22.6035 28.1866 28.9102 21.8799 28.9102 14.1007C28.9102 6.32158 22.6035 0.0148926 14.8244 0.0148926ZM14.8244 27.1074C7.64697 27.1041 1.8311 21.2781 1.83446 14.1007C1.83783 6.92334 7.66378 1.10747 14.8412 1.11083C22.0186 1.11419 27.8344 6.94015 27.8311 14.1175C27.8311 15.9531 27.4411 17.7684 26.6847 19.4426C24.5836 24.1087 19.941 27.1074 14.8244 27.1074Z" fill="#111111"/>
                                                        <path d="M19.1544 6.47622H10.4945C8.72283 6.45941 7.27055 7.87808 7.24365 9.64974V18.5618C7.26382 20.3368 8.71947 21.7555 10.4911 21.7353H19.141C20.916 21.7555 22.3683 20.3368 22.3918 18.5618V9.64974C22.3716 7.87808 20.9227 6.45941 19.1544 6.47622ZM21.0975 18.5618C21.0975 19.6006 20.2571 20.441 19.2217 20.441C19.1981 20.441 19.178 20.441 19.1544 20.441H10.4945C9.45906 20.478 8.58836 19.6678 8.55138 18.629C8.55138 18.6055 8.55138 18.5853 8.55138 18.5618V9.64974C8.55138 8.61095 9.39183 7.77051 10.4273 7.77051C10.4508 7.77051 10.471 7.77051 10.4945 7.77051H19.1443C20.1798 7.73353 21.0505 8.54372 21.0874 9.5825C21.0874 9.60604 21.0874 9.62621 21.0874 9.64974L21.0975 18.5618Z" fill="#111111"/>
                                                        <path d="M14.8244 10.1372C12.6359 10.1372 10.8608 11.9122 10.8608 14.1007C10.8608 16.2893 12.6359 18.0643 14.8244 18.0643C17.0129 18.0643 18.7879 16.2893 18.7879 14.1007C18.7879 11.9122 17.0129 10.1372 14.8244 10.1372ZM14.8244 16.7128C13.362 16.7128 12.1753 15.5261 12.1753 14.0638C12.1753 12.6014 13.362 11.4147 14.8244 11.4147C16.2867 11.4147 17.4735 12.6014 17.4735 14.0638C17.4735 14.0772 17.4735 14.0873 17.4735 14.1007C17.4667 15.5598 16.2867 16.7431 14.8244 16.7498V16.7128Z" fill="#111111"/>
                                                        <path d="M19.077 10.87C19.5913 10.87 20.0082 10.4531 20.0082 9.93878C20.0082 9.42449 19.5913 9.00757 19.077 9.00757C18.5627 9.00757 18.1458 9.42449 18.1458 9.93878C18.1458 10.4531 18.5627 10.87 19.077 10.87Z" fill="#111111"/>
                                                    </svg>
                                                </a>
                                            </span>
                                            <?php endif; ?>
                                            <?php if($coauthor['facebook']): ?>
                                            <span class="facebook">
                                                <a href="<?php echo $coauthor['facebook']; ?>">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                                        <path d="M28.1474 9.74065C30.5544 17.1399 26.5068 25.0871 19.1075 27.4942C11.7083 29.9012 3.76103 25.8536 1.354 18.4544C-1.05303 11.0551 2.99455 3.10786 10.3938 0.700831C11.8024 0.243629 13.2749 0.00830078 14.754 0.00830078C20.8557 0.0116626 26.2614 3.93822 28.1474 9.74065ZM14.754 1.27905C7.67414 1.28914 1.94231 7.03441 1.95239 14.1177C1.96248 21.1976 7.70776 26.9294 14.791 26.9193C21.8709 26.9092 27.6027 21.164 27.5927 14.0807C27.5893 12.7393 27.3775 11.4081 26.964 10.134C25.2461 4.8459 20.3144 1.26897 14.754 1.27905Z" fill="#111111"/>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.057 9.24322C17.5175 9.24322 17.9949 9.24322 18.4387 9.24322H18.6269V6.84963C18.3815 6.84963 18.1294 6.79248 17.8672 6.77567C17.3965 6.77567 16.9292 6.77567 16.4586 6.77567C15.7459 6.77231 15.0533 6.99083 14.4684 7.39424C13.8196 7.87161 13.3893 8.58767 13.275 9.38441C13.2212 9.70042 13.1909 10.0198 13.1808 10.3425C13.1808 10.877 13.1808 11.4116 13.1808 11.9494V12.2218H10.8982V14.8876H13.1607V21.5843H15.9778V14.8607H18.2403L18.5126 12.2218H15.8837C15.8837 12.2218 15.8837 10.8972 15.8837 10.3425C15.9577 9.49535 16.4283 9.26002 17.057 9.24322Z" fill="#111111"/>
                                                    </svg>
                                                </a>
                                            </span>
                                            <?php endif; ?>
                                            <?php if($coauthor['twitter']): ?>
                                            <span class="twitter">
                                                <a href="<?php echo $coauthor['twitter']; ?>">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                        <path d="M28.6031 10.0878C31.0956 17.7498 26.9043 25.9793 19.2422 28.4718C11.5802 30.9643 3.35069 26.773 0.858168 19.111C-1.63435 11.4489 2.55697 3.21941 10.219 0.726891C11.6776 0.253452 13.2024 0.00976562 14.7341 0.00976562C21.0524 0.0132468 26.6502 4.07926 28.6031 10.0878ZM14.7376 1.32565C7.40625 1.33609 1.47085 7.28541 1.48129 14.6202C1.49173 21.9551 7.44106 27.887 14.7759 27.8765C22.1072 27.8661 28.0426 21.9168 28.0322 14.5819C28.0287 13.193 27.8094 11.8144 27.3812 10.4951C25.5988 5.01917 20.492 1.3152 14.7376 1.32565Z" fill="#111111"/>
                                                        <path d="M6.73092 7.07715L12.9378 15.3763L6.69263 22.1263H8.09902L13.5679 16.2187L17.9856 22.1263H22.7687L16.2102 13.3607L22.0237 7.08063H20.6173L15.587 12.5182L11.5175 7.07715H6.73092ZM8.79874 8.11106H10.9954L20.7009 21.0889H18.5042L8.79874 8.11106Z" fill="#111111"/>
                                                    </svg>
                                                </a>
                                            </span>
                                            <?php endif; ?>
                                                </div>
                                            </div>


                                        </div>
                                        <?php if($coauthor['author_bio']): ?>
                                        <div class="authbio">
                                            <?php echo $coauthor['author_bio']; ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                            <?php endif; ?>
                            <?php endforeach; ?>
                        </div>


                        </div>
                        <div class="author-info">
                            <?php foreach( $get_coauthors as $coauthor ): ?>

                            <?php if ($coauthor['colunista'] == '1'): ?>

                                <div class="author-info-card">
                                    
                                    <?php echo get_avatar($coauthor['author_id'], 128);?>
                                    <?php if($coauthor['author_name']): ?>
                                        <div class="author-name">
                                            <?php echo $coauthor['author_name']; ?>
                                        </div>
                                    <?php endif; ?>

                                    <?php if($coauthor['author_bio']): ?>
                                        <div class="authbio">
                                            <?php echo $coauthor['author_bio']; ?>
                                        </div>
                                    <?php endif; ?>
                                    <div class="social-networks">
                                        <?php if($coauthor['instagram']): ?>
                                        <span class="instagram">
                                            <a href="<?php echo $coauthor['instagram']; ?>">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                                <path d="M14.8241 0.437256C7.04497 0.437256 0.738281 6.74395 0.738281 14.5231C0.738281 22.3022 7.04497 28.6089 14.8241 28.6089C22.6033 28.6089 28.91 22.3022 28.91 14.5231C28.91 6.74395 22.6033 0.437256 14.8241 0.437256ZM14.8241 27.5298C7.64673 27.5264 1.83086 21.7005 1.83422 14.5231C1.83758 7.3457 7.66354 1.52983 14.8409 1.53319C22.0183 1.53655 27.8342 7.36251 27.8308 14.5399C27.8308 16.3754 27.4409 18.1908 26.6845 19.865C24.5834 24.5311 19.9407 27.5298 14.8241 27.5298Z" fill="white"/>
                                                <path d="M19.1539 6.89859H10.494C8.72235 6.88178 7.27006 8.30045 7.24316 10.0721V18.9842C7.26333 20.7592 8.71898 22.1779 10.4906 22.1577H19.1405C20.9155 22.1779 22.3678 20.7592 22.3913 18.9842V10.0721C22.3712 8.30045 20.9222 6.88178 19.1539 6.89859ZM21.097 18.9842C21.097 20.023 20.2566 20.8634 19.2212 20.8634C19.1976 20.8634 19.1775 20.8634 19.1539 20.8634H10.494C9.45857 20.9004 8.58787 20.0902 8.55089 19.0514C8.55089 19.0279 8.55089 19.0077 8.55089 18.9842V10.0721C8.55089 9.03331 9.39134 8.19287 10.4268 8.19287C10.4503 8.19287 10.4705 8.19287 10.494 8.19287H19.1439C20.1793 8.15589 21.05 8.96608 21.087 10.0049C21.087 10.0284 21.087 10.0486 21.087 10.0721L21.097 18.9842Z" fill="white"/>
                                                <path d="M14.8239 10.5596C12.6354 10.5596 10.8604 12.3346 10.8604 14.5231C10.8604 16.7116 12.6354 18.4866 14.8239 18.4866C17.0124 18.4866 18.7874 16.7116 18.7874 14.5231C18.7874 12.3346 17.0124 10.5596 14.8239 10.5596ZM14.8239 17.1352C13.3615 17.1352 12.1748 15.9485 12.1748 14.4861C12.1748 13.0238 13.3615 11.837 14.8239 11.837C16.2863 11.837 17.473 13.0238 17.473 14.4861C17.473 14.4996 17.473 14.5097 17.473 14.5231C17.4662 15.9821 16.2863 17.1655 14.8239 17.1722V17.1352Z" fill="white"/>
                                                <path d="M19.0767 11.2924C19.591 11.2924 20.0079 10.8754 20.0079 10.3611C20.0079 9.84685 19.591 9.42993 19.0767 9.42993C18.5624 9.42993 18.1455 9.84685 18.1455 10.3611C18.1455 10.8754 18.5624 11.2924 19.0767 11.2924Z" fill="white"/>
                                                </svg>
                                            </a>
                                        </span>
                                        <?php endif; ?>
                                        <?php if($coauthor['facebook']): ?>
                                        <span class="facebook">
                                            <a href="<?php echo $coauthor['facebook']; ?>">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                                <path d="M28.1474 10.163C30.5544 17.5623 26.5068 25.5095 19.1075 27.9165C11.7083 30.3236 3.76103 26.276 1.354 18.8767C-1.05303 11.4775 2.99455 3.53023 10.3938 1.12319C11.8024 0.665993 13.2749 0.430664 14.754 0.430664C20.8557 0.434026 26.2614 4.36058 28.1474 10.163ZM14.754 1.70142C7.67414 1.7115 1.94231 7.45678 1.95239 14.54C1.96248 21.6199 7.70776 27.3518 14.791 27.3417C21.8709 27.3316 27.6027 21.5863 27.5927 14.5031C27.5893 13.1617 27.3775 11.8305 26.964 10.5563C25.2461 5.26826 20.3144 1.69133 14.754 1.70142Z" fill="white"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0567 9.66558C17.5173 9.66558 17.9947 9.66558 18.4384 9.66558H18.6267V7.272C18.3813 7.272 18.1291 7.21485 17.8669 7.19804C17.3963 7.19804 16.929 7.19804 16.4583 7.19804C15.7456 7.19467 15.0531 7.41319 14.4682 7.8166C13.8193 8.29397 13.389 9.01003 13.2747 9.80677C13.2209 10.1228 13.1907 10.4422 13.1806 10.7649C13.1806 11.2994 13.1806 11.8339 13.1806 12.3718V12.6441H10.8979V15.31H13.1604V22.0067H15.9776V15.2831H18.2401L18.5124 12.6441H15.8835C15.8835 12.6441 15.8835 11.3196 15.8835 10.7649C15.9574 9.91771 16.4281 9.68239 17.0567 9.66558Z" fill="white"/>
                                                </svg>
                                            </a>
                                        </span>
                                        <?php endif; ?>
                                        <?php if($coauthor['twitter']): ?>
                                        <span class="twitter">
                                            <a href="<?php echo $coauthor['twitter']; ?>">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                <path d="M28.6031 10.0878C31.0956 17.7498 26.9043 25.9793 19.2422 28.4718C11.5802 30.9643 3.35069 26.773 0.858168 19.111C-1.63435 11.4489 2.55697 3.21941 10.219 0.726891C11.6776 0.253452 13.2024 0.00976562 14.7341 0.00976562C21.0524 0.0132468 26.6502 4.07926 28.6031 10.0878ZM14.7376 1.32565C7.40625 1.33609 1.47085 7.28541 1.48129 14.6202C1.49173 21.9551 7.44106 27.887 14.7759 27.8765C22.1072 27.8661 28.0426 21.9168 28.0322 14.5819C28.0287 13.193 27.8094 11.8144 27.3812 10.4951C25.5988 5.01917 20.492 1.3152 14.7376 1.32565Z" fill="#111111"/>
                                                <path d="M6.73092 7.07715L12.9378 15.3763L6.69263 22.1263H8.09902L13.5679 16.2187L17.9856 22.1263H22.7687L16.2102 13.3607L22.0237 7.08063H20.6173L15.587 12.5182L11.5175 7.07715H6.73092ZM8.79874 8.11106H10.9954L20.7009 21.0889H18.5042L8.79874 8.11106Z" fill="#111111"/>
                                            </svg>
                                            </a>
                                        </span>
                                        <?php endif; ?>
                                    </div>
                                </div>
                                <?php endif; ?>
                            <?php endforeach; ?>
                        </div>
                </header>

                <section class="post-content">
                    <?php the_content(); ?>

                    <div class="page-share">
                        <?php echo do_shortcode('[addtoany]'); ?>
                        <?php the_social_networks_menu() ?>
                    </div>

                    <div class="comments">

                    </div>
                </section>
            </article>
        <?php endwhile; ?>

        <section class="post-footer">
            <div class="related-posts">
                <?php get_template_part('template-parts/content/related-posts-colunistas'); ?>
            </div>
        </section>
    </main>

</div>

<?php get_footer(); ?>
