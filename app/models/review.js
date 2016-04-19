import orm from 'orm';


export default class Review {
  static init(db){
    return db.qDefine("review", {
      review_ID          : { type: "serial", key: true },
      FK_FROM_user_ID    : { type: 'integer', required: true},
      FK_TO_user_ID      : { type: 'integer', required: true},
      description        : { type: "text", big:true},
      rate               : { type: 'integer', required: true},
      created_DATE       : { type: "date", time: true, required: true},
      updated_DATE       : { type: "date", time: true, required: true}
    }, {
      hooks: {
        beforeCreate: function(next){
          this.created_DATE = Date.now();
          this.updated_DATE = Date.now();
          return next();
        },
        beforeUpdate: function(next){
          this.updated_DATE = Date.now();
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
