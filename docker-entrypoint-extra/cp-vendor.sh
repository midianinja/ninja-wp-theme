#!/bin/bash
cp -TRf vendor/plugins/ wp-content/plugins/
cp -TRf vendor/themes/ wp-content/themes/


ln -s ../../plugins/divi-builder wp-content/plugins/divi-builder
ln -s ../../themes/Divi wp-content/themes/Divi
ln -s ../../themes/Extra wp-content/themes/Extra
