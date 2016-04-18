import orm from 'orm';


export default class NotificationType {
  static init(db){
    return db.qDefine("notification_TYPE", {
      notification_TYPE_ID  : { type: "serial", key: true },
      name                  : String,
      created_Date          : { type: "date", time: true },
      updated_Date          : { type: "date", time: true }
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
