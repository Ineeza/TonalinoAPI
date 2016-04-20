import orm from 'orm';
import dateFunctions from './callback/date.js';


export default class EventMember {
  static init(db){
    return db.qDefine("eventMember", {
      eventMember_ID          : { type: "serial", key: true },
      FK_event_ID             : { type: 'integer', required: true},
      FK_user_ID              : { type: 'integer', required: true},
      FK_eventMember_TYPE_ID  : { type: 'integer', required: true},
      created_DATE            : { type: "date", time: true, required: true},
      updated_DATE            : { type: "date", time: true, required: true}
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
