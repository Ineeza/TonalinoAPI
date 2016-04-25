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
      Start_Date        : { type: "date", time: true, required: true },
      End_Date          : { type: "date", time: true, required: true },
      created_Date      : { type: "date", time: true, required: true},
      updated_Date      : { type: "date", time: true, required: true}
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
