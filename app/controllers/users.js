export default {
  create: (req, res)=>{
    req.models.User.qFind({ facebook_id: req.body.facebook_id }).then(users=>{
      if(users.length > 0){
        console.log(users[0]);
        var user = {
          id: users[0].id,
          facebook_id: users[0].facebook_id,
          user_name: users[0].user_name,
          role: users[0].role,
          description: users[0].description
        };
        req.session.user = user;
        req.session.save(_=>{
          res.send(req.session.user);
        });
      } else {
        var user = {
          facebook_id: req.body.facebook_id,
          user_name: req.body.facebook_name,
          role: "eater",
          description: ""
        };
        req.models.User.qCreate(user).then(_user=>{
          user.id = _user.id;
          req.session.user = user;
          req.session.save(_=>{
            res.send(req.session.user);
          });
        })
      }
    });
  }
}
