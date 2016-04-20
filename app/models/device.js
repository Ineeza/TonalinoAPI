import orm from 'orm';


export default class Device {
  static init(db){
    return db.qDefine("device", {
      device_ID         : { type: "serial", key: true },
      FK_user_ID        : Number,
      info              : { type: "text", big:true},
      registration_ID   : String,
      created_DATE      : { type: "date", time: true },
      updated_DATE      : { type: "date", time: true }
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
