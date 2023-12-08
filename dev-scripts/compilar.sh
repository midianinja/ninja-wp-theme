#!/bin/bash 
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CDIR=$( pwd )
cd $DIR/../themes/midia-ninja-theme
docker run -it -v `pwd`:/compilar node:12 bash -c "cd compilar && npm install && npm run production"
