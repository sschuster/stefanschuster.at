stefanschuster.at
=================

Source of stefanschuster.at homepage

Requires node.js >= 10.0

    docker build -t sschuster/stefanschuster.at .
    docker run --name stefanschuster.at -p 3000:3000 -d --restart always sschuster/stefanschuster.at
