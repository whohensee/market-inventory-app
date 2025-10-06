#!/bin/bash
# Not needed as compose now points to sde db on creation
# createdb -U yaml -T template0 sde

# Must configure the name of this to match the manually downloaded
# postgres dump from Fuzzworks (NOT the schema version)
# It must also be pre-unzipped. That's why its not in github
pg_restore -U yaml -d sde postgres-latest-2025-07-07.dmp