<?php
define('WIDGETGROUP_MAIN', 'Jaci Widgets');
define('WIDGETGROUP_SIDEBAR', 'Jaci Sidebar Widgets');

/** Add SiteOrigin Page Builder custom fields class prefixes */
add_filter('siteorigin_widgets_field_class_prefixes', function ($class_prefixes) {
    $class_prefixes[] = 'Jaci_';
    return $class_prefixes;
});

/** Add SiteOrigin Page Builder custom fields */
add_filter('siteorigin_widgets_field_class_paths', function( $class_paths) {
    $class_paths[] = get_template_directory() . '/library/pagebuilder/custom-fields/';
    return $class_paths;
});

/** Add SiteOrigin Page Builder custom widgets */
add_filter('siteorigin_widgets_widget_folders', function ($folders) {
    $folders[] = get_template_directory() . '/library/pagebuilder/widgets/';
    return $folders;
});
