import orm from 'orm';


export default class Review {
  static init(db){
    return db.qDefine("review", {
      review_ID          : { type: "serial", key: true },
      Start_user_ID      : { type: 'integer', required: true},
      End_user_ID        : { type: 'integer', required: true},
      description        : { type: "text", big:true},
      rate               : { type: 'integer', required: true},
      created_Date       : { type: "date", time: true, required: true, defaultValue: new Date()},
      updated_Date       : { type: "date", time: true, required: true, defaultValue: new Date()}
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
