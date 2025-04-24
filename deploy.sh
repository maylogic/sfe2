#!/bin/bash
# так нельзя деплоить потому что content-type не определяется правильно и сайт перестает работать
yc storage s3 cp .output/public/ s3://safepets.ru --recursive --content-type auto