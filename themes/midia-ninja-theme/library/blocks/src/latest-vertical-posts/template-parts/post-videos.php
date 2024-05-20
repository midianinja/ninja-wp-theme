<a href="<?php echo $args['video']['video_url']; ?>" target="_blank" itemprop="url">
    <div class="post videos" itemscope itemtype="http://schema.org/VideoObject">
        <div class="post-thumbnail">
            <div class="play"></div>
            <img src="<?php echo $args['video']['thumbnail']; ?>" alt="<?php echo $args['video']['title']; ?>" itemprop="thumbnailUrl">
        </div>
        <div class="post-content">
            <span class="video-title" itemprop="name"><?php echo $args['video']['title']; ?></span>
        </div>
        <meta itemprop="contentUrl" content="<?php echo $args['video']['video_url']; ?>">
        <meta itemprop="description" content="<?php echo $args['video']['description']; ?>">
        <meta itemprop="uploadDate" content="<?php echo $args['video']['uploadDate']; ?>">
        <meta itemprop="duration" content="<?php echo $args['video']['duration']; ?>">
    </div>
</a>
