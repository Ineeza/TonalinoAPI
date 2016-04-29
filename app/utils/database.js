export default {
  getConf :  _=>{
    var YAML = require('yamljs');
    var orm = require("orm");

      let ymlObj = YAML.load('env.yml');
      var db = "";
      switch (process.env.NODE_ENV) {
        case "test":
          db = ymlObj.test;
          break;
        case "production":
          db = ymlObj.production;e
          break;
        default:
          db = ymlObj.development;
      }
      var conn  = orm.connect("mysql://"+db.user+":"+db.password+"@"+db.host+"/"+db.database);
    return conn;
  }
};
