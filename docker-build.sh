# docker build shell to easy the Jenkins CI process
actual_version="1.5.0"
old_version="1.1.0"

#balance options
balance_port1="3010"
balance_port2="3011"
balance_port3="3012"

#building new image
echo Building container to v$actual_version
docker build -t colorbucket-api:$actual_version .

#stopping previous version
docker stop colorbucket-api-1-v$old_version
docker stop colorbucket-api-2-v$old_version
docker stop colorbucket-api-3-v$old_version

#removing old images and containers
docker container rm colorbucket-api-1-v$old_version
docker container rm colorbucket-api-2-v$old_version
docker container rm colorbucket-api-3-v$old_version
docker image rm colorbucket-api:$old_version

#starting new containers
docker run --name colorbucket-api-1-v$actual_version -p $balance_port1:3010 -d colorbucket-api:$actual_version
docker run --name colorbucket-api-2-v$actual_version -p $balance_port2:3010 -d colorbucket-api:$actual_version
docker run --name colorbucket-api-3-v$actual_version -p $balance_port3:3010 -d colorbucket-api:$actual_version

#debug
#echo Press any key to stop
#read OUT_PARAM