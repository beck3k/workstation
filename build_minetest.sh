#/bin/bash

MINETEST_CLIENT_DIR="./minetest_client"
MINETEST_GIT_REPO="https://github.com/minetest/minetest.git"
CMAKE_ARGS=""

if [ "$1" == "-clone" ]; then
	git clone $MINETEST_GIT_REPO $MINETEST_CLIENT_DIR
fi 

if [ "$1" == "-build" ]; then
	if [ -d "$MINETEST_CLIENT_DIR" ]; then
		cd $MINETEST_CLIENT_DIR
		cmake . -DRUN_IN_PLACE=1 $CMAKE_ARGS
		make -j$(nproc)
	else
		>&2 echo "CLONE_DIR_NOT_EXISTS"
	fi
fi
