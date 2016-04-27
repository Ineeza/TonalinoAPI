import gcm from 'node-gcm';

var sendNotification = (req, res, regTokens, gcm_message)=>{
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

    req.models.User.qFind({user_ID: user_id}).then(users=>{
      if(users.length > 0){
        req.models.Device.qFind({user_ID: user_id}).then(devices=>{
          var regTokens = [];
          for (var device of devices) {
            regTokens.push(device.registration_ID);
          }
          console.log(regTokens);
          sendNotification(req, res, regTokens, gcm_message);
        });
      } else {
        console.error("[Error] No user matched user.");
        res.status(404).send("[Error] No user matched user.");
      }
    }).catch(err=>{
      console.error(err);
      res.status(404).send("Error");
    });
  }

}
