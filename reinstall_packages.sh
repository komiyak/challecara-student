#!/bin/bash

pushd functions; npm cache clean --force; rm -rf node_modules; npm install; popd
pushd web; npm cache clean --force; rm -rf node_modules; npm install; popd
