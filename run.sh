#!/bin/sh

# substitute all related envs
export $(cat ./env | xargs)

yarn dev