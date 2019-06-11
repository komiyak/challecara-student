#!/bin/bash

# Building the student-front app.
pushd student-front; npm run build; popd
# Replace the public directory to the built app.
rm -rf public/
mv student-front/build/ public/

# Keep .keep file.
touch public/.keep
