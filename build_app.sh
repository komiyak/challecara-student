#!/bin/bash

# Building the frontend app.
pushd web; npm run build; popd
# Replace the public directory to the built app.
rm -rf public/
mv web/build/ public/

# Keep .keep file.
touch public/.keep
