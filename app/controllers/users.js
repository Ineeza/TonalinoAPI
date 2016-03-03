export default {
  create: (req, res)=>{
    req.models.user.qFind({ facebook_id: req.body.facebook_id }).then(users=>{
      if(users.length > 0){
        var user = users[0];
        req.session.user = user;
        req.session.save(_=>{
          res.send(req.session.user);
        });
      } else {
        var user = {
          facebook_id: req.body.facebook_id,
          user_name: req.body.facebook_name,
          role: "eater"
        };
        req.models.user.qCreate(user).then(_user=>{
          req.session.user = _user;
          req.session.save(_=>{
            res.send(req.session.user);
          });
        })
      }
    });
  }
}
