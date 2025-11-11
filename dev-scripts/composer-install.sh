#!/bin/bash 
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/../themes/midia-ninja-theme

docker run -it -v `pwd`:/compilar composer:2.9 bash -c "cd /compilar && composer install"