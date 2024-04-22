<?php
get_header();
gt_set_post_view();
get_template_part( 'template-parts/header-especiais' );

$category = get_the_terms($post->ID, 'category');
$coauthors = get_coauthors();

?>

<div class="index-wrapper">
    <div class="container">
        <div class="row">
            
            <div class="banner-principal col-md-9"> 
                <div class="lado-esquerdo-banner">
                    <div class="container-info">
                    <div class="tag">
                    <div class="entry-meta"><?php echo get_html_terms( get_the_ID(), 'category', true, true, 1 ); ?></div>
                </div>
                <div class="title">
                    <a href="<?php the_permalink(); ?>"><h5 class="entry-title"><?php the_title(); ?></h5></a>

                </div>
                <div class="resumo">
                    <p><?php echo custom_excerpt( ( str_word_count( get_the_title() ) <= 10 ) ? 15 : 20 ); ?></p>
                </div>
                    </div>
                </div>
                <div class="divladodireiro-banner"></div>
            </div>
            <aside class="col-md-3">
                <div class="author-info">
                    <?php foreach( $coauthors as $coauthor ): ?>
                    <?php
                        $author_id = '';
                        $author_bio = '';
                        $instagram = '';
                        if (is_a($coauthor, 'WP_User')) {
                            $author_id = $coauthor->data->ID;
                            $author_name = $coauthor->data->display_name;
                            $userdata = get_userdata( $author_id );
                            $author_bio = isset( $userdata->user_description )? $userdata->user_description: '';
                            $instagram = pods_field( 'user', $author_id, 'instagram', true);
                            $facebook = pods_field( 'user', $author_id, 'facebook', true);
                            $twitter = pods_field( 'user', $author_id, 'twitter', true);
                        } else {

                            $author_id = $coauthor->ID;
                            $author_bio = $coauthor->description;
                            $instagram = get_user_meta($author_id, 'instagram', true);
                            $facebook = get_user_meta($author_id, 'facebook', true);
                            $twitter = get_user_meta($author_id, 'twitter', true);
                        }
                    ?>
                    <div class="author-info-card">
                        <?php echo get_avatar($author_id, 128);?>
                        <div class="author-name">
                            <?php echo  $author_name; ?>
                        </div>

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
                                        <path d="M14.8244 0.0148926C7.04522 0.0148926 0.738525 6.32158 0.738525 14.1007C0.738525 21.8799 7.04522 28.1866 14.8244 28.1866C22.6035 28.1866 28.9102 21.8799 28.9102 14.1007C28.9102 6.32158 22.6035 0.0148926 14.8244 0.0148926ZM14.8244 27.1074C7.64697 27.1041 1.8311 21.2781 1.83446 14.1007C1.83783 6.92334 7.66378 1.10747 14.8412 1.11083C22.0186 1.11419 27.8344 6.94015 27.8311 14.1175C27.8311 15.9531 27.4411 17.7684 26.6847 19.4426C24.5836 24.1087 19.941 27.1074 14.8244 27.1074Z" fill="#111111"/>
                                        <path d="M19.1544 6.47622H10.4945C8.72283 6.45941 7.27055 7.87808 7.24365 9.64974V18.5618C7.26382 20.3368 8.71947 21.7555 10.4911 21.7353H19.141C20.916 21.7555 22.3683 20.3368 22.3918 18.5618V9.64974C22.3716 7.87808 20.9227 6.45941 19.1544 6.47622ZM21.0975 18.5618C21.0975 19.6006 20.2571 20.441 19.2217 20.441C19.1981 20.441 19.178 20.441 19.1544 20.441H10.4945C9.45906 20.478 8.58836 19.6678 8.55138 18.629C8.55138 18.6055 8.55138 18.5853 8.55138 18.5618V9.64974C8.55138 8.61095 9.39183 7.77051 10.4273 7.77051C10.4508 7.77051 10.471 7.77051 10.4945 7.77051H19.1443C20.1798 7.73353 21.0505 8.54372 21.0874 9.5825C21.0874 9.60604 21.0874 9.62621 21.0874 9.64974L21.0975 18.5618Z" fill="#111111"/>
                                        <path d="M14.8244 10.1372C12.6359 10.1372 10.8608 11.9122 10.8608 14.1007C10.8608 16.2893 12.6359 18.0643 14.8244 18.0643C17.0129 18.0643 18.7879 16.2893 18.7879 14.1007C18.7879 11.9122 17.0129 10.1372 14.8244 10.1372ZM14.8244 16.7128C13.362 16.7128 12.1753 15.5261 12.1753 14.0638C12.1753 12.6014 13.362 11.4147 14.8244 11.4147C16.2867 11.4147 17.4735 12.6014 17.4735 14.0638C17.4735 14.0772 17.4735 14.0873 17.4735 14.1007C17.4667 15.5598 16.2867 16.7431 14.8244 16.7498V16.7128Z" fill="#111111"/>
                                        <path d="M19.077 10.87C19.5913 10.87 20.0082 10.4531 20.0082 9.93878C20.0082 9.42449 19.5913 9.00757 19.077 9.00757C18.5627 9.00757 18.1458 9.42449 18.1458 9.93878C18.1458 10.4531 18.5627 10.87 19.077 10.87Z" fill="#111111"/>
                                    </svg>
                                </a>
                            </span>
                            <?php endif; ?>
                            <?php if($facebook): ?>
                            <span class="facebook">
                                <a href="<?php echo $facebook; ?>">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                        <path d="M28.1474 9.74065C30.5544 17.1399 26.5068 25.0871 19.1075 27.4942C11.7083 29.9012 3.76103 25.8536 1.354 18.4544C-1.05303 11.0551 2.99455 3.10786 10.3938 0.700831C11.8024 0.243629 13.2749 0.00830078 14.754 0.00830078C20.8557 0.0116626 26.2614 3.93822 28.1474 9.74065ZM14.754 1.27905C7.67414 1.28914 1.94231 7.03441 1.95239 14.1177C1.96248 21.1976 7.70776 26.9294 14.791 26.9193C21.8709 26.9092 27.6027 21.164 27.5927 14.0807C27.5893 12.7393 27.3775 11.4081 26.964 10.134C25.2461 4.8459 20.3144 1.26897 14.754 1.27905Z" fill="#111111"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.057 9.24322C17.5175 9.24322 17.9949 9.24322 18.4387 9.24322H18.6269V6.84963C18.3815 6.84963 18.1294 6.79248 17.8672 6.77567C17.3965 6.77567 16.9292 6.77567 16.4586 6.77567C15.7459 6.77231 15.0533 6.99083 14.4684 7.39424C13.8196 7.87161 13.3893 8.58767 13.275 9.38441C13.2212 9.70042 13.1909 10.0198 13.1808 10.3425C13.1808 10.877 13.1808 11.4116 13.1808 11.9494V12.2218H10.8982V14.8876H13.1607V21.5843H15.9778V14.8607H18.2403L18.5126 12.2218H15.8837C15.8837 12.2218 15.8837 10.8972 15.8837 10.3425C15.9577 9.49535 16.4283 9.26002 17.057 9.24322Z" fill="#111111"/>
                                    </svg>
                                </a>
                            </span>
                            <?php endif; ?>
                            <?php if($twitter): ?>
                            <span class="twitter">
                                <a href="<?php echo $twitter; ?>">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                        <path d="M28.6031 10.0878C31.0956 17.7498 26.9043 25.9793 19.2422 28.4718C11.5802 30.9643 3.35069 26.773 0.858168 19.111C-1.63435 11.4489 2.55697 3.21941 10.219 0.726891C11.6776 0.253452 13.2024 0.00976562 14.7341 0.00976562C21.0524 0.0132468 26.6502 4.07926 28.6031 10.0878ZM14.7376 1.32565C7.40625 1.33609 1.47085 7.28541 1.48129 14.6202C1.49173 21.9551 7.44106 27.887 14.7759 27.8765C22.1072 27.8661 28.0426 21.9168 28.0322 14.5819C28.0287 13.193 27.8094 11.8144 27.3812 10.4951C25.5988 5.01917 20.492 1.3152 14.7376 1.32565Z" fill="#111111"/>
                                        <path d="M6.73092 7.07715L12.9378 15.3763L6.69263 22.1263H8.09902L13.5679 16.2187L17.9856 22.1263H22.7687L16.2102 13.3607L22.0237 7.08063H20.6173L15.587 12.5182L11.5175 7.07715H6.73092ZM8.79874 8.11106H10.9954L20.7009 21.0889H18.5042L8.79874 8.11106Z" fill="#111111"/>
                                    </svg>
                                </a>
                            </span>
                            <?php endif; ?>
                        </div>
                    </div>
                    <?php if($author_bio): ?>
                        <div class="authbio-mobile">
                            <?php echo $author_bio; ?>
                        </div>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </div>
            </aside>
            <main class="container-colunistas col-md-9">
                <div class="container-posts">
                    <?php while ( have_posts() ) : the_post(); ?>
                        <?php get_template_part( 'template-parts/content/post' ); ?>    
                    <?php endwhile; ?>
                </div>
                   
                    <?php echo get_layout_footer('author'); ?>
                <?php get_template_part( 'template-parts/content/pagination' ); ?>
            </main>
            

        </div><!-- /.row --> 
    </div><!-- /.container -->
</div><!-- /.index-wrapper -->

<?php get_footer();
