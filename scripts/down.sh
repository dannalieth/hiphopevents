#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd $BASEDIR/..

kill -9 $(cat processes.pid)
rm processes.pid

