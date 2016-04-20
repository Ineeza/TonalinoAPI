import orm from 'orm';
import dateFunctions from './callback/date.js';


export default class NotificationIsRead {
  static init(db){
    return db.qDefine("notificationIsRead", {
      notificationIsRead_ID  : { type: "serial", key: true },
      FK_notification_ID     : { type: 'integer', required: true},
      FK_user_ID             : { type: 'integer', required: true},
      isRead                 : { type: "boolean" },
      created_DATE           : { type: "date", time: true, required: true, defaultValue: new Date },
      updated_DATE           : { type: "date", time: true, required: true, defaultValue: new Date }
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
