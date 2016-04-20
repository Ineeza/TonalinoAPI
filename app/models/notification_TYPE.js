import orm from 'orm';
import dateFunctions from './callback/date.js';


export default class NotificationType {
  static init(db){
    return db.qDefine("notification_TYPE", {
      notification_TYPE_ID  : { type: "serial", key: true },
      name                  : { type: "text", required: true},
      created_DATE          : { type: "date", time: true, required: true, defaultValue: new Date },
      updated_DATE          : { type: "date", time: true, required: true, defaultValue: new Date }
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
