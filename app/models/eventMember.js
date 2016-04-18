import orm from 'orm';


export default class EventMember {
  static init(db){
    return db.qDefine("eventMember", {
      eventMember_ID          : { type: "serial", key: true },
      FK_event_ID             : Number,
      FK_user_ID              : Number,
      FK_eventMember_TYPE_ID  : Number,
      created_DATE            : { type: "date", time: true },
      updated_DATE            : { type: "date", time: true }
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
