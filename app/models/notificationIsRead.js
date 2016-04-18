import orm from 'orm';


export default class NotificationIsRead {
  static init(db){
    return db.qDefine("notificationIsRead", {
      notificationIsRead_ID    : { type: "serial", key: true },
      FK_notification_ID       : Number,
      FK_user_ID               : Number,
      isRead                   : { type: "boolean" },
      created_DATE             : { type: "date", time: true },
      updated_DATE             : { type: "date", time: true }
    }, {
      hooks: {
        beforeCreate: function(next){
          this.created_DATE = Date.now();
          this.updated_DATE = Date.now();
          return next();
        },
        beforeUpdate: function(next){
          this.updated_DATE = Date.now();
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
