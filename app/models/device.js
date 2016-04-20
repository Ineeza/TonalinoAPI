import orm from 'orm';
import dateFunctions from './callback/date.js';


export default class Device {
  static init(db){
    return db.qDefine("device", {
      device_ID         : { type: "serial", key: true },
      FK_user_ID        : { type: 'integer', required: true},
      info              : { type: "text", big:true},
      registration_ID   : { type: "text", required: true},
      created_DATE      : { type: "date", time: true, required: true, defaultValue: new Date },
      updated_DATE      : { type: "date", time: true, required: true, defaultValue: new Date }
    }, {
      hooks: {
        beforeUpdate: next=>{ return dateFunctions.updatedDate(this, next) }
      },
      methods: {

      },
      validations: {

      }
    });
  }
}
