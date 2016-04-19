import gcm from 'node-gcm';

var sendNotification = (req, res, regToken, gcm_message)=>{
  // Set up the sender with you API key
  var sender = new gcm.Sender('AIzaSyCOCyeaPBtatF-VcfZIzb87lTXDsKwMJk0');

  // Now the sender can be used to send messages
  sender.send(gcm_message, { registrationTokens: regTokens }, function (err, response) {
    // if(err) console.error(err);
    // else 	console.log(response);
    console.error(req.headers.origin);
    if(!err){
      res.send("successed");
    } else {
      res.send("failed");
    }
  });
};



export default {
  // Send to another user
  sendto: (req, res)=>{
    var json = req.body;

    var gcm_message = new gcm.Message();

    // Given values
    var title = json.title;
    var message = json.message;
    var image = json.image;
    var user_id = json.receiver_id;

    res.header('Access-Control-Allow-Origin', req.headers.origin);
    console.log(json);
    if(!user_id || !message) {
      res.status(404).send("Invalid params");
    }
    // Add notification payload as key value
    gcm_message.addData('title', title);
    gcm_message.addData('message', message);
    gcm_message.addData('image', image);

    var regTokens = "";
    //if(user_id == 1){
      //regTokens = ['dCNIYW8tdtU:APA91bFmkbmO6lRJ_98bAqZ5EZ3KrpACM4R1WWg1Qhsw5DcsTCTP8btlojaxbQ3w64urMSyvrBJSP6YGhZVXKz_0g7uCKA8IsICa3BtZeBYiqaGl6jJ5FACohmIYopqlgSDbltJaapAb'];
      //sendNotification(req, res, regTokens, gcm_message);
    //} else {
      req.models.User.qFind({user_ID: user_id})
        .then(users=>{
	  if(users.length > 0){
            console.log(users);
            regTokens = [users[0].registrationID];
            sendNotification(req, res, regTokens, gcm_message);
	  } else {
            console.error("[Error] No user matched user.");
	  }
	})
	.catch(err=>{
          console.error(err);
	});
    //}
   
  }

}
