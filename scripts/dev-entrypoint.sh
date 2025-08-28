#!/bin/bash
if [ -f .env ]; then
    # Загружаем переменные из .env файла
    set -a
    source .env
    set +a
else
    echo "Файл .env не найден!"
    exit 1
fi

yarn run prisma generate
yarn run prisma migrate deploy
yarn run start:dev
