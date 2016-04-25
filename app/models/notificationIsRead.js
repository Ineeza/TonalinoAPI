import orm from 'orm';


export default class NotificationIsRead {
  static init(db){
    return db.qDefine("notificationIsRead", {
      notificationIsRead_ID  : { type: "serial", key: true },
      notification_ID     : { type: 'integer', required: true},
      user_ID             : { type: 'integer', required: true},
      isRead                 : { type: "boolean" },
      created_Date           : { type: "date", time: true, required: true},
      updated_Date           : { type: "date", time: true, required: true}
    }, {
      hooks: {
        beforeCreate: function(next){
          this.created_Date = Date.now();
          this.updated_Date = Date.now();
          return next();
        },
        beforeUpdate: function(next){
          this.updated_Date = Date.now();
          return next();
        }
      },
      methods: {

      },
      validations: {

      }
    });
  }
}
