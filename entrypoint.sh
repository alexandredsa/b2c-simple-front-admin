#!/bin/sh
set -e
cd /src
npm i
npm run build

npm config set unsafe-perm true

rm -rf public
mv dist public
find . -not -path "./public*" -delete
nginx -g 'daemon off;'