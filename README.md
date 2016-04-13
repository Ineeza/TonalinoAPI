# tonalino api

## architecture
- babel(ES6)
- node
- express
- mysql

## run
- `gulp prod`

## kill
- `gulp kill`

## see process
- `gulp see`

# infrastructure
- `wget git.io/nodebrew`
- `perl nodebrew setup`
- Add `export PATH=$HOME/.nodebrew/current/bin:$PATH` to `~/.bashrc`
- `source ~/.bashrc`
- `sudo yum install gcc gcc-c++ mysql`
- `nodebrew install v4.3.0`
- `nodebrew use v4.3.0`
- `npm i`
- `mkdir -p node_modules/.bin`
- `cd node_modules/.bin`
- `ln -s ../babel-cli/bin/babel-node.js ./babel-node`
- `npm i -g npm-install-missing`
- `npm-install-missing`
- `sudo mysqld_safe &`
- `mysqladmin -u root password root`
- `mysql -u root -p`
- `CREATE DATABASE tonalino`
