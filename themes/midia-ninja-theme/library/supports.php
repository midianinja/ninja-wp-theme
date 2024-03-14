<?php

/**
 *
 * Adds theme supports
 *
 * As of version 5.8, supports for blocks must be inserted from the theme.json file in the root of the theme
 * @link https://github.com/WordPress/gutenberg/blob/trunk/docs/how-to-guides/themes/theme-json.md
 *
 */
function theme_supports()
{
    add_theme_support('align-wide');
    add_theme_support('custom-logo');
    add_theme_support('post-thumbnails');
    add_theme_support('core-block-patterns');
    add_theme_support('customize-selective-refresh-widgets');
    add_theme_support('editor-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('widgets');

    /**
     * Adds support for project CPTs to the Newspack Blocks plugin when it is active
     */
    if (is_plugin_active('newspack-blocks/newspack-blocks.php')) {
        add_post_type_support('afluente', 'newspack_blocks');
        add_post_type_support('entrevista', 'newspack_blocks');
        add_post_type_support('especial', 'newspack_blocks');
        add_post_type_support('news', 'newspack_blocks');
        add_post_type_support('opiniao', 'newspack_blocks');
    }

    global $wp_version;
    if (version_compare($wp_version, '5.8', '<')) {
        add_theme_support('custom-line-height');
        add_theme_support('custom-spacing');
        add_theme_support('custom-units');
        add_theme_support('editor-color-palette');
        add_theme_support('editor-gradient-presets');
        add_theme_support('editor-font-sizes');
    }
}
add_action('after_setup_theme', 'theme_supports');

/**
 * Load the theme textdomain
 */
function theme_setup()
{
    load_theme_textdomain('ninja', get_stylesheet_directory() . '/languages');
}
add_action('after_setup_theme', 'theme_setup');

/**
 * Print the excerpt with limited words
 *
 * @todo move to utils.php file
 */
function custom_excerpt($limit)
{

    $excerpt = explode(' ', get_the_excerpt(), $limit);

    if (count($excerpt) >= $limit) {
        array_pop($excerpt);
        $excerpt = implode(' ', $excerpt) . ' ...';
    } else {
        $excerpt = implode(' ', $excerpt);
    }

    $excerpt = preg_replace('`[[^]]*]`', '', $excerpt);

    return $excerpt;

}

/**
 * Add support to load blocks scripts only if needed
 */
add_filter('should_load_separate_core_block_assets', '__return_true');
