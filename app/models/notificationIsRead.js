import orm from 'orm';
import dateFunctions from './callback/date.js';


export default class NotificationIsRead {
  static init(db){
    return db.qDefine("notificationIsRead", {
      notificationIsRead_ID  : { type: "serial", key: true },
      FK_notification_ID     : { type: 'integer', required: true},
      FK_user_ID             : { type: 'integer', required: true},
      isRead                 : { type: "boolean" },
      created_DATE           : { type: "date", time: true, required: true},
      updated_DATE           : { type: "date", time: true, required: true}
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
