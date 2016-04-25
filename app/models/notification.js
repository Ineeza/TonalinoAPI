import orm from 'orm';


export default class Notification {
  static init(db){
    return db.qDefine("notification", {
      notification_ID       : { type: "serial", key: true },
      event_ID              : { type: 'integer', required: true},
      user_ID               : { type: 'integer', required: true},
      notification_Type_ID  : { type: 'integer', required: true},
      title                 : { type: "text", required: true},
      description           : { type: "text", big:true},
      created_Date          : { type: "date", time: true, required: true},
      updated_Date          : { type: "date", time: true, required: true}
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
