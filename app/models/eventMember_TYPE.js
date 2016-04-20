import orm from 'orm';


export default class EventMemberType {
  static init(db){
    return db.qDefine("eventMember_TYPE", {
      eventMember_TYPE_ID   : { type: "serial", key: true },
      name                  : String,
      created_DATE          : { type: "date", time: true },
      updated_DATE          : { type: "date", time: true }
    }, {
      hooks: {
        beforeCreate: dateFunctions.createdDate,
        beforeUpdate: dateFunctions.updatedDate
      },
      methods: {

      },
      validations: {

      }
    });
  }
}
