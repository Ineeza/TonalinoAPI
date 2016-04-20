import orm from 'orm';

export default class UserType {
  static init(db){
    return db.qDefine("user_TYPE", {
      user_TYPE_ID          : { type: "serial", key: true },
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
