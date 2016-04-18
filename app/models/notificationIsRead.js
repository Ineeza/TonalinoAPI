import orm from 'orm';


export default class NotificationIsRead {
  static init(db){
    return db.qDefine("notificationIsRead", {
      notificationIsRead_ID    : { type: "serial", key: true },
      FK_notification_ID       : Number,
      FK_user_ID               : Number,
      isRead                   : String,
      created_Date             : { type: "date", time: true },
      updated_Date             : { type: "date", time: true }
    }, {
      hooks: {
        beforeCreate: function(next){
          this.createdDate = Date.now();
          this.updatedDate = Date.now();
          return next();
        },
        beforeUpdate: function(next){
          this.updatedDate = Date.now();
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
