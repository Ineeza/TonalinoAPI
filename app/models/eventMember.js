import orm from 'orm';


export default class EventMember {
  static init(db){
    return db.qDefine("eventMember", {
      eventMember_ID          : { type: "serial", key: true },
      FK_event_ID             : Number,
      FK_user_ID              : Number,
      FK_eventMember_TYPE_ID  : Number,
      created_Date            : { type: "date", time: true },
      updated_Date            : { type: "date", time: true }
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
