import gcm from 'node-gcm';

export default {
  // Send to another user
  sendto: (req, res)=>{

    // send function
    var sendNotification = (regTokens, gcm_message)=>{
      // Set up the sender with you API key
      var sender = new gcm.Sender('AIzaSyCOCyeaPBtatF-VcfZIzb87lTXDsKwMJk0');

	/*
      regTokens = [
        'dvypELZLyCo:APA91bFFFYVmPiMm6STWMamrzzEXt28xswUBJlKDFkfJvaYQZZyyFk2lUmGcJcbH8gbE8TUCsBCeF5Beab3m-q-o2s4tDxj3MLKRIybcMSnD-_DFyV4gRcYvKfxDxPyWtHgB2mJbY-UK',
        'fIA6o7pPymA:APA91bGm-hJ4WRNSBIyvoMMbEBfdQ3TSFSfOkbo7cfeVrXFURFgOwApqQ3vKuaBy_H2tZ8mId7JlIpIo42Hbfai3XajX9TPxtGp2HHNt5F_qLTD78ipSuxwsZAwQjOHSGDptIejoV-I0'
      ];
	*/

      sender.send(gcm_message, { registrationTokens: regTokens }, function (err, response) {
        // if(err) console.error(err);
        // else 	console.log(response);
        if(!err){
          res.send("successed");
        } else {
          res.send("failed");
        }
      });
    };

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
    req.models.User.qFind({ user_ID: user_id })
      .then(users=>{
	if(users.length > 0){
          req.models.Device.qFind({ FK_user_ID: user_id })
          .then(devices=>{
            regTokens = devices.map(device=> device.registration_ID );
            sendNotification(regTokens, gcm_message);
      	  })
	  .catch(err=>{
            console.error(err);
          }); 
        } else {
          console.error("[Error] No user matched user.");
 	}
      })
      .catch(err=>{
        console.error(err);
      });
  },

  createDeviceInfo: (req, res)=>{
    var json = req.body;
    var rid = json.registrationID;
    var uid = json.userID;
    var deviceInfo = json.deviceInfo;
    req.models.Device.qFind({ registration_ID: rid, FK_user_ID: uid })
      .then(data=>{
        req.models.Device.qCreate({ FK_user_ID: uid, info: deviceInfo, registration_ID: rid })
          .then(data=>{
            res.send("successed");
          })
          .catch(err=>{
            res.status(503).send("failed to create device info");
          });
      })
      .catch(err=>{
        res.status(503).send("failed to check device data");
      });
  }

}
