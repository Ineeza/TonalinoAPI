import orm from 'orm';


export default class EventMember {
  static init(db){
    return db.qDefine("eventMember", {
      eventMember_ID       : { type: "serial", key: true },
      event_ID             : { type: 'integer', required: true},
      user_ID              : { type: 'integer', required: true},
      eventMember_Type_ID  : { type: 'integer', required: true},
      created_Date         : { type: "date", time: true, required: true, defaultValue: new Date()},
      updated_Date         : { type: "date", time: true, required: true, defaultValue: new Date()}
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
