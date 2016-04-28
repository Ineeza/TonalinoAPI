import SCHEMA from './schema.json';
import _ from 'lodash';

export default class Mapper {
  static b2f(modelName, backendObject){
    var frontendObject = {};
    Object.keys(backendObject).map((key, i)=>{
      var backendFieldName = key;
      var frontendFieldName = SCHEMA[modelName][backendFieldName];
      frontendObject[frontendFieldName] = backendObject[backendFieldName];
    });
    return frontendObject;
  }

  static f2b(modelName, frontendObject){
    var backendObject = {};
    Object.keys(frontendObject).map((key, i)=>{
      var frontendFieldName = key;
      var backendFieldName = Mapper.inverseObject(SCHEMA[modelName])[frontendFieldName];
      backendObject[backendFieldName] = frontendObject[frontendFieldName];
    });
    return backendObject;
  }

  static inverseObject (obj, keyIsNumber) {
    return Object.keys(obj).reduceRight((ret, k) => {
      return (ret[obj[k]] = keyIsNumber ? parseInt(k, 10) : k, ret);
    }, {});
  }

}
