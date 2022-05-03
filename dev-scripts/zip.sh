#!/bin/bash 
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CDIR=$( pwd )
cd $DIR/../themes
zip -r ../zips/base-theme-slug.zip base-theme-slug -x "base-theme-slug/node_modules/*"