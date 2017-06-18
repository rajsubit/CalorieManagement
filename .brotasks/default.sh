#!/bin/sh

project=$(basename `pwd`)

init () {
  echo "Stay Healthy !!!"
  bro cenv
}

cenv() {
	source vcalorie/bin/activate
	nvm use 7.3.0
}

$@
