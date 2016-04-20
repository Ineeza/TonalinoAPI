import orm from 'orm';
import dateFunctions from './callback/date.js';


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
        beforeCreate: next=>{ return dateFunctions.createdDate(this, next) },
        beforeUpdate: next=>{ return dateFunctions.updatedDate(this, next) }
      },
      methods: {

      },
      validations: {

      }
    });
  }
}
