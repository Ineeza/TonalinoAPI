import orm from 'orm';

export default class User {
  static init(db){
    return db.qDefine("users", {
      userID                : Number,
      username              : String,
      facebookID            : String,
      lineID                : String,
      description           : String,
      picture               : { type: "text", defaultValue: "/img/common/no_image.png" },
      email                 : String,
      zipcode               : Number,
      area                  : { type: "text", defaultValue: null },
      role                  : { type: "enum", values: ["eater", "cooker"], defaultValue: "eater" },
      registrationID        : String,
      createdDate           : { type: "date", time: true },
      updatedDate           : { type: "date", time: true }
    }, {
      hooks: {
        beforeCreate: function(next){
          this.createdDate = Date.now();
          this.updatedDate = Date.now();
          return next();
        },
        beforeUpdate: function(next){
          this.updatedDate = Date.now();
          return next();
        }
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
