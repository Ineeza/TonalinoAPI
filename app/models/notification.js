import orm from 'orm';


export default class Notification {
  static init(db){
    return db.qDefine("notification", {
      notification_ID          : { type: "serial", key: true },
      FK_event_ID              : { type: 'integer', required: true},
      FK_user_ID               : { type: 'integer', required: true},
      FK_notification_TYPE_ID  : { type: 'integer', required: true},
      title                    : { type: "text", required: true},
      description              : { type: "text", big:true},
      created_DATE             : { type: "date", time: true, required: true},
      updated_DATE             : { type: "date", time: true, required: true}
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
