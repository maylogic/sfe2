#!/bin/bash
docker run --rm -v "$(pwd)":/usr/src/app -w /usr/src/app node:22.12.0 "$@"
