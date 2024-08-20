<?php
$video_url = ( isset($args['video']['video_url'])) ? $args['video']['video_url'] : '';
$thumbnail = ( isset($args['video']['thumbnail'])) ? $args['video']['thumbnail'] : '';
$title = ( isset($args['video']['title'])) ? $args['video']['title'] : '';
$description = ( isset($args['video']['description'])) ? $args['video']['description'] : '';
$uploadDate = ( isset($args['video']['uploadDate'])) ? $args['video']['uploadDate'] : '';
$duration = ( isset($args['video']['duration'])) ? $args['video']['duration'] : '';
?>
<a href="<?php echo $video_url; ?>" target="_blank" itemprop="url">
    <div class="post videos" itemscope itemtype="http://schema.org/VideoObject">
        <div class="post-thumbnail">
            <div class="play"></div>
            <img src="<?php echo $thumbnail; ?>" alt="<?php echo $title; ?>" itemprop="thumbnailUrl">
        </div>
        <meta itemprop="contentUrl" content="<?php echo $video_url; ?>">
        <meta itemprop="name" content="<?php echo $title; ?>">
        <meta itemprop="description" content="<?php echo $description; ?>">
        <meta itemprop="uploadDate" content="<?php echo $uploadDate; ?>">
        <meta itemprop="duration" content="<?php echo $duration; ?>">
    </div>
</a>
