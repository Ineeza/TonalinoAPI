import orm from 'orm';


export default class NotificationType {
  static init(db){
    return db.qDefine("notification_TYPE", {
      notification_TYPE_ID  : { type: "serial", key: true },
      name                  : { type: "text", required: true},
      created_DATE          : { type: "date", time: true, required: true},
      updated_DATE          : { type: "date", time: true, required: true}
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
