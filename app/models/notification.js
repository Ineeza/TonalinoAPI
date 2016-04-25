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
      created_Date          : { type: "date", time: true, required: true, defaultValue: new Date()},
      updated_Date          : { type: "date", time: true, required: true, defaultValue: new Date()}
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
