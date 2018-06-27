docker build -t ilotusenviro-web-gis .
docker tag ilotusenviro-admin-api today108/ilotusenviro-web-gis
docker push today108/ilotusenviro-web-gis
echo "success deploy web gis"
