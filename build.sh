#!/bin/bash
REGISTRY_HOST='https://hub.docker.com/r/skylying/carousell-interview-image'
IMAGE_NAME='billboard'
DOCKER_USER_ID='skylying'

build() {
  echo 'cleaning tmp files...'
  find . |egrep '.(swm|swn|swo|swp|pyc)$' |xargs rm -f
  find . |egrep __pycache__ |xargs rmdir

  echo 'building docker images...'
  sudo -E docker build -t $IMAGE_NAME -f Dockerfile .

  commitcount=`git rev-list --count HEAD`
  commitid=`git rev-parse HEAD`
  image_tag="1.0.0.dev${commitcount}_${commitid:0:7}"
  echo "tagging images with $image_tag..."
  sudo -E docker tag $IMAGE_NAME $DOCKER_USER_ID/$IMAGE_NAME
}

push() {
  echo "pushing image $REGISTRY_HOST/$NAME:$image_tag..."
  sudo -E docker push $DOCKER_USER_ID/$IMAGE_NAME
}


if [ "$1" == "" ]; then
    build
    exit 0
fi

if [ "$1" == "push" ]; then
    push
    exit 0
fi

if [ "$1" == "release" ]; then
    build
    push
    exit 0
fi