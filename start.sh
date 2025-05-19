#!/bin/bash

# Загружаем переменные из .env
export $(grep -v '^#' .env | xargs)

# Дополнительные переменные можно указать явно
export NODE_ENV=${NODE_ENV:-development}
export PORT=${PORT:-3000}

/usr/bin/node --experimental-specifier-resolution=node .output/server/index.mjs