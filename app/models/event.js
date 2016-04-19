import orm from 'orm';

export default class Event {
  static init(db){
    return db.qDefine("event", {
      event_ID          : { type: "serial", key: true },
      FK_event_TYPE_ID  : { type: 'integer', required: true},
      title             : { type: "text", required: true},
      description       : { type: "text", big:true},
      place             : { type: "text", big:true},
      coverPicture      : { type: "text", big:true},
      price             : { type: 'integer', required: true},
      seats             : { type: 'integer', required: true},
      FROM_DATE         : { type: "date", time: true, required: true },
      TO_DATE           : { type: "date", time: true, required: true },
      created_DATE      : { type: "date", time: true, required: true},
      updated_DATE      : { type: "date", time: true, required: true}
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
