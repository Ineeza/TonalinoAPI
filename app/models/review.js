import orm from 'orm';


export default class Review {
  static init(db){
    return db.qDefine("review", {
      review_ID          : { type: "serial", key: true },
      Start_user_ID      : { type: 'integer', required: true},
      End_user_ID        : { type: 'integer', required: true},
      description        : { type: "text", big:true},
      rate               : { type: 'integer', required: true},
      created_Date       : { type: "date", time: true, required: true},
      updated_Date       : { type: "date", time: true, required: true}
    }, {
      hooks: {
        beforeCreate: function(next){
          this.created_Date = Date.now();
          this.updated_Date = Date.now();
          return next();
        },
        beforeUpdate: function(next){
          this.updated_Date = Date.now();
          return next();
        }
      },
      methods: {

      },
      validations: {

      }
    });
  }
}
