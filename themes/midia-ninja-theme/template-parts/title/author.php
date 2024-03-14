<?php
?>
<header class="c-title title-author">
    <div class="container">
        <h1 class="entry-title">
            <?php printf(__('Author: %s', 'ninja'), get_the_author_meta('display_name', get_queried_object_id()));?>
        </h1>
        <p><?php the_author_meta('description', get_queried_object_id());?></p>
    </div>
</header><!-- /.c-title.title-default -->