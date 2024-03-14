<?php
if (empty($authors) || !is_array($authors)) {
    return;
}
?>
<div class="post-content--section-title">
    <?= count($authors) > 1 ? __('Autores', 'ninja') : __('Autor', 'ninja') ?>
</div>
<?php foreach ($authors as $author): ?>
    <div class="post-content--author">
        <?php $avatar = guaraci\authors::get_avatar($author);
    if (!empty($avatar)): ?>
            <div class="post-content--author-avatar">
                <div role="img" style="background-image: url(<?= $avatar ?>)"></div>
            </div>
        <?php endif; ?>
        <div>
            <a href="<?= get_term_link($author) ?>" class="post-content--author-name"><?= $author->name ?></a>
            <div class="post-content--author-biography"><?= $author->description ?></div>
        </div>
    </div>
<?php endforeach; ?>