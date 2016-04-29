import YAML from 'yamljs';
import mysql from 'mysql';
import databaseUtil from '../../utils/database.js';

export default {
  index: (req, res)=>{
    // TODO remove this if session exists
    // let user = req.session.user;

    let json = req.query;
    console.log(json);
    let user_id = json.user_id;

    var conn = databaseUtil.getConf();

    conn.driver.execQuery("\
      SELECT \
        nr.notificationIsRead_ID, \
        nr.notification_ID, \
        nr.user_ID, \
        n.event_ID, \
        u.name AS user_name, \
        u.picture AS user_picture, \
        e.title AS event_title, \
        nt.name AS notification_Type_name, \
        nr.created_Date \
      FROM notificationIsRead AS nr \
      JOIN notification AS n ON nr.notification_ID=n.notification_ID \
      JOIN event AS e ON n.event_ID=e.event_ID \
      JOIN notification_Type AS nt ON n.notification_Type_ID=nt.notification_Type_ID \
      JOIN user AS u ON n.user_ID=u.user_ID \
      WHERE nr.isRead=0 AND nr.user_ID=? ;",
      [user_id],
      function (err, data) {
        console.log('=== ExecQuery ===');
        console.log(data);
        console.log('=================');
        res.status(200).send(data);
      }
    )
  }
}
