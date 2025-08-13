#!/bin/bash

cd docker 

docker compose -p mkdocs up -d

cd ../scripts
./update_status_overview.sh