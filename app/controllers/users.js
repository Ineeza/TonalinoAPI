export default {
  create: (req, res)=>{
    req.models.user.qFind({ facebook_id: req.body.facebook_id }).then(users=>{
      console.log("session", req.session);
      if(users.length > 0){
        var user = users[0];
        req.session.user_id = user.id;
        req.session.save(_=>{
          console.log("session saved");
          res.send({ created: false });
        });
      } else {
        var user = {
          facebook_id: req.body.facebook_id,
          user_name: req.body.facebook_name,
          role: "eater"
        };
        req.models.user.qCreate(user).then(items=>{
          console.log("created user", user);
          // if success session create
          req.session.user_id = user.id;
          req.session.save(_=>{
            res.send({ created: true });
          });
        })
      }
    });
  }
}
