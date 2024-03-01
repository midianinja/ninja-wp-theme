<div class="post-content--subshare">
    <span><?php _e( 'Share', 'base-textdomain' ) ?></span>

    <a href="https://www.facebook.com/sharer/sharer.php?u=<?= get_the_permalink() ?>" target="_blank"><i class="fab fa-facebook-f"></i></a>
    
    <a href="https://twitter.com/intent/tweet?text=<?= urlencode(get_the_title()) ?>&url=<?= get_the_permalink() ?>" target="_blank"><i class="fab fa-twitter"></i></a>
    
    <a href="whatsapp://send?text=<?= (get_the_title().' - '.get_the_permalink()) ?>" target="_blank" class="hide-for-large"><i class="fab fa-whatsapp"></i></a>
    
    <a href="https://api.whatsapp.com/send?text=<?= (get_the_title().' - '.get_the_permalink()) ?>" class="show-for-large" target="_blank"><i class="fab fa-whatsapp"></i></a>
    
    <a href="https://telegram.me/share/url?url=<?= get_the_title().' - '.get_the_permalink() ?>" target="_blank"><i class="fab fa-telegram"></i></a>
</div>