import orm from 'orm';

export default class Event {
  static init(db){
    return db.qDefine("event", {
      event_ID              : { type: "serial", key: true },
      FK_event_TYPE_ID      : String,
      title                 : String,
      description           : String,
      place                 : String,
      coverPicture          : String,
      price                 : String,
      seats                 : String,
      FROM_DATE             : String,
      TO_DATE               : String,
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
