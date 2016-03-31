import gcm from 'node-gcm';

export default {
  create: (req, res)=>{
    let user = req.session.user;
    let candidate_role = (user.role === "eater") ? "cooker" : "eater";
    req.models.User
    .qFind({ role: candidate_role }).then(users=>{
      var excluded_users = users.filter(user=>{
        return user.id != req.session.user.id;
      });
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.send(excluded_users);
    });
  },
  create2: (req, res)=>{

    var message = new gcm.Message();

    // TODO Some given values
    var text = "となりのごはんほげ";


    // Add notification payload as key value
    message.addData('title', 'タイトルですよ。');
    message.addData('message', 'となりのごはんがきましたhoge');
    message.addData('image', 'https://lh3.ggpht.com/uA_9YvBqat-4ftl9Kn40fGuf_6GmDUKuba_Vjn2fo9CnojlOGandrcj2pLp67Q5Wb6I=w300');


    var regTokens = ['dqG2VV6gvTM:APA91bGxa_5yfNS6BZ3KBzk_RloK83dpJ4FHohcIyXNYZ0lbOX_oD-Bybqkn-Zhlhzos5cqt2iD7cUNssA465YHAYzdtB_620uhAlC_1EcSm15I5V0gGEzwiaGbETme9NoGC3cufOoeM'];

    // Set up the sender with you API key
    var sender = new gcm.Sender('AIzaSyCOCyeaPBtatF-VcfZIzb87lTXDsKwMJk0');

    // Now the sender can be used to send messages
    sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    	if(err) console.error(err);
    	else 	console.log(response);
    });

    res.send(text);
  }

}
