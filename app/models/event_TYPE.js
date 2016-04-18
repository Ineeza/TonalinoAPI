import orm from 'orm';

export default class EventType {
  static init(db){
    return db.qDefine("event_TYPE", {
      event_TYPE_ID      : { type: "serial", key: true },
      name               : String,
      createdDate        : { type: "date", time: true },
      updatedDate        : { type: "date", time: true }
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
