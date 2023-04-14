#!/usr/bin/bash

pkg install git nodejs mc nano yarn
yarn install
npm start

echo "All dependencies have been installed, please run the command \"npm start\" to immediately start the script"
