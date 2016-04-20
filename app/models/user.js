import orm from 'orm';
import dateFunctions from './callback/date.js';

export default class User {
  static init(db){
    return db.qDefine("user", {
      user_ID               : { type: "serial", key: true },
      FK_user_TYPE_ID       : Number,
      name                  : String,
      facebook_ID           : String,
      line_ID               : String,
      description           : { type: "text", big:true},
      picture               : { type: "text", defaultValue: "/img/common/no_image.png" },
      email                 : String,
      postalCode            : String,
      area                  : { type: "text", big:true},
      created_DATE          : { type: "date", time: true },
      updated_DATE          : { type: "date", time: true }
    }, {
      hooks: {
        beforeCreate: next=>{ return dateFunctions.createdDate(this, next) },
        beforeUpdate: next=>{ return dateFunctions.updatedDate(this, next) }
      },
      methods: {
        isEater: _=>{
          return this.role === "eater";
        },
        getCandidates: current_user => {
          var self = this;
          return new Promise((resolve, reject)=>{
            console.log(current_user);
            self.qFind({ role: current_user.role }).then(users=>{
              console.log(users.length);
              var excluded_users = users.filder(user=>{
                return user.id != current_user.id;
              });
              console.log(excluded_users.length);
              resolve(excluded_users);
            });
          });
        }
      },
      validations: {
        role: orm.enforce.patterns.match(/(eater|cooker)/, "Not match neither eater or cooker.")
      }
    });
  }
}
