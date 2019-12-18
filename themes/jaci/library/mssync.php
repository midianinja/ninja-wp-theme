<?php

namespace jaci;

if (class_exists('hl\\mssync\\Rule')) {

    $sp = new \hl\mssync\Origin([
        'site_ids' => function ($site_id) {
            return $site_id > 1;
        }
    ]);

    $main_site = new \hl\mssync\Destination([
        'site_ids' => [1],
        'add_terms' => ['category' => ['Subsites']],
        'new_post_status' => 'publish',
        'publish_updates' => true
    ]);

    $main = new \hl\mssync\Rule($sp, $main_site);
}
