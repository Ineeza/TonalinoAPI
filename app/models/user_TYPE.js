import orm from 'orm';

export default class UserType {
  static init(db){
    return db.qDefine("user_Type", {
      user_Type_ID      : { type: "serial", key: true },
      name              : { type: "text", required: true},
      created_Date      : { type: "date", time: true, required: true, defaultValue: new Date()},
      updated_Date      : { type: "date", time: true, required: true, defaultValue: new Date()}
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
