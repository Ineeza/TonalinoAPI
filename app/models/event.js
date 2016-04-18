import orm from 'orm';

export default class Event {
  static init(db){
    return db.qDefine("event", {
      event_ID              : { type: "serial", key: true },
      FK_event_TYPE_ID      : Number,
      title                 : String,
      description           : { type: "text", big:true},
      place                 : { type: "text", big:true},
      coverPicture          : { type: "text", big:true},
      price                 : Number,
      seats                 : Number,
      FROM_DATE             : { type: "date", time: true },
      TO_DATE               : { type: "date", time: true },
      createdDate           : { type: "date", time: true },
      updatedDate           : { type: "date", time: true }
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
