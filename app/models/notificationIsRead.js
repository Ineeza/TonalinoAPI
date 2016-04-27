import orm from 'orm';


export default class NotificationIsRead {
  static init(db){
    return db.qDefine("notificationIsRead", {
      notificationIsRead_ID  : { type: "serial", key: true },
      notification_ID     : { type: 'integer', required: true},
      user_ID             : { type: 'integer', required: true},
      isRead                 : { type: "boolean" },
      created_Date           : { type: "date", time: true, required: true, defaultValue: new Date()},
      updated_Date           : { type: "date", time: true, required: true, defaultValue: new Date()}
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
