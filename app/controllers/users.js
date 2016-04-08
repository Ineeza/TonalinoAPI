export default {

  index: (req, res)=>{
    req.models.User.qFind({ id: req.query.id }).then(users=>{
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.send(users);
    });
  },

  create: (req, res)=>{
    req.models.User.qFind({ facebook_id: req.body.facebook_id }).then(users=>{
      if(users.length > 0){
        /*
        var user = {
          id: users[0].id,
          facebook_id: users[0].facebook_id,
          user_name: users[0].user_name,
          email: users[0].email,
          picture: users[0].picture,
          role: users[0].role,
          description: users[0].description
        };
        */
        req.session.user = users[0];
        req.session.save(_=>{
          res.header('Access-Control-Allow-Origin', req.headers.origin);
          res.send(req.session.user);
        });
      } else {
        var user = {
          facebook_id: req.body.facebook_id,
          user_name: req.body.facebook_name,
          email: req.body.email,
          picture: req.body.picture,
          role: "eater"
        };
        req.models.User.qCreate(user).then(_user=>{
          user.id = _user.id;
          req.session.user = user;
          req.session.save(_=>{
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.send(req.session.user);
          });
        })
      }
    });
  }
}
