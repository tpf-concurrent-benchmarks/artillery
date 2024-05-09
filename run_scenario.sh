#!/bin/bash
OLD_DIR="$(pwd)"
DIR="$(cd -P "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd $DIR

if [ -f ./.env ]; then
  export $(cat ./.env | sed 's/#.*//g' | xargs)
fi

npm run artillery -- run scenarios/$1.yaml -e $2

cd $OLD_DIR