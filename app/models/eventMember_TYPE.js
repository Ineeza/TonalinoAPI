import orm from 'orm';
import dateFunctions from './callback/date.js';


export default class EventMemberType {
  static init(db){
    return db.qDefine("eventMember_TYPE", {
      eventMember_TYPE_ID   : { type: "serial", key: true },
      name                  : { type: "text", required: true},
      created_DATE          : { type: "date", time: true, required: true},
      updated_DATE          : { type: "date", time: true, required: true}
    }, {
      hooks: {
        beforeCreate: next=>{ return dateFunctions.createdDate(this, next) },
        beforeUpdate: next=>{ return dateFunctions.updatedDate(this, next) }
      },
      methods: {

      },
      validations: {

      }
    });
  }
}
