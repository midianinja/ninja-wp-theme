<?php
global $wp;

$current_url = get_post_type_archive_link( get_post_type() ) . '?&';

$taxonomy = ( isset( $args['taxonomy'] ) ) ? $args['taxonomy'] : 'category';
$taxonomy_terms = get_terms( $taxonomy );

if ( $taxonomy_terms && ! is_wp_error( $taxonomy_terms ) ) :

    $selected = '';

    if ( isset( $_GET['filter_term'] ) ) {
        $selected = sanitize_title( $_GET['filter_term'] );
    } ?>

    <div class="filter-posts">
        <form name="filterposts">
            <select class="filter-options-form" name="select" size="1" onChange="goFilter()">
                <option <?php echo ( $selected == '' ) ? 'selected' : '' ?> class="filter-options-item" value="<?php echo $current_url ?>filter_term=all"><?php _e( 'Filtrar por...', 'escola-de-dados' ); ?></option>
                <?php foreach ( $taxonomy_terms as $term ) : ?>
                    <option <?php echo ( $selected == $term->slug ) ? 'selected' : '' ?> class="filter-options-item" value="<?php echo $current_url ?>filter_term=<?php echo $term->slug; ?>"><?php echo $term->name; ?></option>
                <?php endforeach; ?>
            </select>

            <script type="text/javascript">
                function goFilter(){
                    var to = document.filterposts.select.options[document.filterposts.select.selectedIndex].value;
                    if ( to != '') {
                        location = to;
                    }
                }
            </script>
        </form>
    </div><!-- .filter-posts -->

<?php endif; ?>