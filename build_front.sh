#!/bin/bash

# Building the frontend app.
pushd front; npm run build; popd
# Replace the public directory to the built app.
rm -rf public/
mv front/build/ public/

# Keep .keep file.
touch public/.keep
