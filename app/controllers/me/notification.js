import gcm from 'node-gcm';

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

    // Add notification payload as key value
    gcm_message.addData('title', title);
    gcm_message.addData('message', message);
    gcm_message.addData('image', image);

    var regTokens = "";
    if(user_id == 1 || !req.session.user.registrationID){
      regTokens = ['dCNIYW8tdtU:APA91bFmkbmO6lRJ_98bAqZ5EZ3KrpACM4R1WWg1Qhsw5DcsTCTP8btlojaxbQ3w64urMSyvrBJSP6YGhZVXKz_0g7uCKA8IsICa3BtZeBYiqaGl6jJ5FACohmIYopqlgSDbltJaapAb'];
    } else {
      regTokens = req.session.user.registrationID;
    }

    // Set up the sender with you API key
    var sender = new gcm.Sender('AIzaSyCOCyeaPBtatF-VcfZIzb87lTXDsKwMJk0');

    // Now the sender can be used to send messages
    sender.send(gcm_message, { registrationTokens: regTokens }, function (err, response) {
    	// if(err) console.error(err);
    	// else 	console.log(response);
    });

    res.send(message);
  }

}
