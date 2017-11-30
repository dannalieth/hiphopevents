#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd $BASEDIR/..

python3 hiphopevents-server/server.py nuyorican.json >> server.log 2>&1 &
echo "$!" >> processes.pid

python3 scraper.py >> scraper.log 2>&1 &
echo "$!" >> processes.pid
