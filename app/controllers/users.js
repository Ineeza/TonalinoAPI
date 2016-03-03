export default {
  create: (req, res)=>{
    req.models.user.qFind({ facebook_id: req.body.facebook_id }).then(users=>{
      console.log('users', users);
      if(users.length > 0){
        var user = users[0];
        // session create
        res.send(false);
      } else {
        var user = {
          facebook_id: req.body.facebook_id,
          user_name: req.body.facebook_name,
          role: "eater"
        };
        req.models.user.qCreate(user).then(items=>{
          console.log("created user", items);
          // if success session create
          res.session.id = items[0].id;
          res.session.save(_=>{
            res.send(true);
          });
        })
      }
    });
  }
}
