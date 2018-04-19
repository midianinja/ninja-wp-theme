#!/bin/bash

WP_PLUGINS="/var/www/html/wp-content/plugins"
WP_THEMES="/var/www/html/wp-content/themes"
DEV_PLUGINS="/var/www/html/plugins"
DEV_THEMES="/var/www/html/themes"
VENDOR_PLUGINS="/var/www/html/vendor/plugins"
VENDOR_THEMES="/var/www/html/vendor/themes"

if [ -d "$VENDOR_PLUGINS" ];
then
    find "$VENDOR_PLUGINS" \
        -maxdepth 1 \
        -mindepth 1 \
        -exec ln -sf {} $WP_PLUGINS \;
fi

if [ -d "$VENDOR_THEMES" ];
then
    find "$VENDOR_THEMES" \
        -maxdepth 1 \
        -mindepth 1 \
        -exec ln -sf {} $WP_THEMES \;
fi

if [ -d "$DEV_PLUGINS" ];
then
    find "$DEV_PLUGINS" \
        -maxdepth 1 \
        -mindepth 1 \
        -exec ln -sf {} $WP_PLUGINS \;
fi

if [ -d "$DEV_THEMES" ];
then
    find "$DEV_THEMES" \
        -maxdepth 1 \
        -mindepth 1 \
        -exec ln -sf {} $WP_THEMES \;
fi
