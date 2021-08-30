#!/bin/bash

echo $(date)
dirname=`basename "$(pwd)"`

# generar librerias
cd ../gt-library
./build-core.sh

# generar aplicacion
cd ../${dirname}
npm i ../gt-library/dist/wt/core/wt-core-0.0.1.tgz

echo $(date)