import orm from 'orm';


export default class Notification {
  static init(db){
    return db.qDefine("notification", {
      notification_ID          : { type: "serial", key: true },
      FK_event_ID              : Number,
      FK_user_ID               : Number,
      FK_notification_TYPE_ID  : Number,
      title                    : String,
      description              : { type: "text", big:true},
      created_DATE             : { type: "date", time: true },
      updated_DATE             : { type: "date", time: true }
    }, {
      hooks: {
        beforeCreate: dateFunctions.createdDate,
        beforeUpdate: dateFunctions.updatedDate
      },
      methods: {

      },
      validations: {

      }
    });
  }
}
