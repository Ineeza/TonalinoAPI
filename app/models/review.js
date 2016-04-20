import orm from 'orm';


export default class Review {
  static init(db){
    return db.qDefine("review", {
      review_ID          : { type: "serial", key: true },
      FK_FROM_user_ID    : Number,
      FK_TO_user_ID      : Number,
      description        : { type: "text", big:true},
      rate               : Number,
      created_DATE       : { type: "date", time: true },
      updated_DATE       : { type: "date", time: true }
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
