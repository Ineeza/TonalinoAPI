import orm from 'orm';
import dateFunctions from './callback/date.js';


export default class NotificationType {
  static init(db){
    return db.qDefine("notification_TYPE", {
      notification_TYPE_ID  : { type: "serial", key: true },
      name                  : { type: "text", required: true},
      created_DATE          : { type: "date", time: true, required: true},
      updated_DATE          : { type: "date", time: true, required: true}
    }, {
      hooks: {
        beforeCreate: next=>{ return dateFunctions.createdDate(this, next) },
        beforeUpdate: next=>{ return dateFunctions.updatedDate(this, next) }
      },
      methods: {

      },
      validations: {

      }
    });
  }
}
