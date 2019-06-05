#!/bin/bash

export GOOGLE_APPLICATION_CREDENTIALS=$PWD/service-account.json

pushd functions; npm run lint; popd

firebase serve
