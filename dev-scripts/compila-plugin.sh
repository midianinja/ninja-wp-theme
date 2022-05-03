#!/bin/bash 
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/../plugins/hacklab-blocks
docker run -it -v `pwd`:/compilar node:12 bash -c "cd compilar && npm install && npm run production"
ls
pwd
cd $DIR/../plugins/
zip -r ../zips/hacklab-blocks.zip hacklab-blocks -x "hacklab-blocks/node_modules/*"