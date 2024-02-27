#!/bin/bash 
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CDIR=$( pwd )
cd $DIR/../themes
zip -r ../zips/midia-ninja-theme.zip midia-ninja-theme -x "midia-ninja-theme/node_modules/*" -x "midia-ninja-theme/library/blocks/node_modules/*" -x "midia-ninja-theme/library/blocks/src/*"