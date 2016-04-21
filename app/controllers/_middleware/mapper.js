import SCHEMA from './schema.json';
import _ from 'lodash';

export default class Mapper {
  static b2f(tableName, backendObject){
    var frontendObject = {};
    console.log(backendObject);
    console.log(SCHEMA[tableName]);
    Object.keys(backendObject).map((key, i)=>{
      var backendFieldName = key;
      var frontendFieldName = SCHEMA[tableName][backendFieldName];
      frontendObject[frontendFieldName] = backendObject[backendFieldName];
    });
    console.log(frontendObject);
    return frontendObject;
  }

  static f2b(tableName, frontendObject){
    var backendObject = {};
    console.log(frontendObject);
    console.log(SCHEMA[tableName]);
    Object.keys(backendObject).map((key, i)=>{
      var frontendFieldName = key;
      // retrieve firld from schema
      var backendFieldName = _.uniq( Object.keys(SCHEMA[tableName]).map((key, i)=>{
        var backendFieldNameCandidate = key;
        var frontendFieldNameCandidate = SCHEMA[tableName][key];
        return (frontendFieldNameCandidate === frontendFieldName) ? backendFieldNameCandidate : "";
      }) )[0];
      backendObject[backendFieldName] = frontendObject[frontendFieldName];
    });
    console.log(backendObject);
    return backendObject;
  }
}
