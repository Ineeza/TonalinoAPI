import orm from 'orm';

export default class User {
  static init(db){
    return db.qDefine("users", {
      user_name      : String,
      facebook_id    : String,
      description    : String,
      role           : String
    }, {
      methods: {
        isEater: _=>{
          return this.role === "eater";
        }
      },
      validations: {
        role: orm.enforce.patterns.match(/(eater|cooker)/, "Not match neither eater or cooker.")
      }
    });
  }
}
