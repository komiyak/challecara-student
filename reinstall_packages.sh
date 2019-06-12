#!/bin/bash

pushd functions; npm cache clean --force; rm -rf node_modules; npm install; popd
pushd front; npm cache clean --force; rm -rf node_modules; npm install; popd
