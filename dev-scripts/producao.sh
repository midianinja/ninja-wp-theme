#!/bin/bash 
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CDIR=$( pwd )
cd $DIR/../dev-scripts
./compilar.sh
./composer-install.sh
./zip.sh
