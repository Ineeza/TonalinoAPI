import orm from 'orm';


export default class User {
  static init(db){
    return db.qDefine("user", {
      user_ID           : { type: "serial", key: true },
      user_Type_ID      : { type: 'integer', required: true},
      name              : { type: "text", required: true},
      API_facebook_ID   : { type: "text", required: true},
      API_line_ID       : { type: "text", required: true},
      description       : { type: "text", big:true},
      picture           : { type: "text", defaultValue: "/img/common/no_image.png" },
      email             : { type: "text", required: true},
      postalCode        : { type: "text", required: true},
      area              : { type: "text", big:true},
      created_Date      : { type: "date", time: true, required: true, defaultValue: new Date()},
      updated_Date      : { type: "date", time: true, required: true, defaultValue: new Date()}
    }, {
      hooks: {
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
