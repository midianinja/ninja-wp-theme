#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CDIR=$( pwd )
cd $DIR/../

docker-compose exec wordpress  bash -c "wp plugin install all-in-one-wp-migration && wp plugin activate all-in-one-wp-migration" 

cd $CDIR
