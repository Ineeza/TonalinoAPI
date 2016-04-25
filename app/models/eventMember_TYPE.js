import orm from 'orm';


export default class EventMemberType {
  static init(db){
    return db.qDefine("eventMember_Type", {
      eventMember_Type_ID   : { type: "serial", key: true },
      name                  : { type: "text", required: true},
      created_Date          : { type: "date", time: true, required: true},
      updated_Date          : { type: "date", time: true, required: true}
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
