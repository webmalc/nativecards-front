#!/bin/bash

rsync -avL -e  "ssh -i ~/.ssh/pem/nativecards.pem" ./www/* ubuntu@3.120.219.126:/home/ubuntu/projects/nativecards-frontend/
