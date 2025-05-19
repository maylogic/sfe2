#!/bin/bash

sudo systemctl stop nuxt-app.service
git pull
npm run build
sudo systemctl start nuxt-app.service