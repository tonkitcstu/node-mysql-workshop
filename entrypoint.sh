#!/bin/bash

# Start Mysql Server.
mysqld_safe --datadir=/var/lib/mysql & 
npm run start

exec "$@"
