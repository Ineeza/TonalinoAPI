export default {
  create: (req, res)=>{
    req.models.user.qFind({ facebook_id: req.body.facebook_id }).then(users=>{
      if(users.length > 0){
        var user = users[0];
        console.log(user);
        req.session.user = user;
        req.session.save(_=>{
          res.send({ created: false });
        });
      } else {
        var user = {
          facebook_id: req.body.facebook_id,
          user_name: req.body.facebook_name,
          role: "eater"
        };
        req.models.user.qCreate(user).then(items=>{
          req.session.user_id = user.id;
          req.session.save(_=>{
            res.send({ created: true });
          });
        })
      }
    });
  }
}
