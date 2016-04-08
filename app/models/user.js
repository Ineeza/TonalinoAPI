import orm from 'orm';

export default class User {
  static init(db){
    return db.qDefine("users", {
      user_name      : String,
      facebook_id    : String,
      description    : String,
      picture        : String,
      email          : String,
      zipcode        : Number,
      area           : String,
      role           : String
    }, {
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
