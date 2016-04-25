import orm from 'orm';

export default class Event {
  static init(db){
    return db.qDefine("event", {
      event_ID          : { type: "serial", key: true },
      event_Type_ID     : { type: 'integer', required: true},
      title             : { type: "text", required: true},
      description       : { type: "text", big:true},
      place             : { type: "text", big:true},
      coverPicture      : { type: "text", big:true},
      price             : { type: 'integer', required: true},
      seats             : { type: 'integer', required: true},
      Start_Date        : { type: "date", time: true, required: true, defaultValue: new Date()},
      End_Date          : { type: "date", time: true, required: true, defaultValue: new Date()},
      created_Date      : { type: "date", time: true, required: true, defaultValue: new Date()},
      updated_Date      : { type: "date", time: true, required: true, defaultValue: new Date()}
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
