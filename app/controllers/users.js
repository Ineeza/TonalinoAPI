export default {

  index: (req, res)=>{
    req.models.User.qFind({ userID: req.query.id }).then(users=>{
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.send(users);
    });
  },

  create: (req, res)=>{
    console.log('users_controller.create', req.body);
    req.models.User.qFind({ facebookID: req.body.facebook_id })
    .then(users=>{
      console.log('users', users.length);
      if(users.length > 0){
        req.session.user = users[0];
        req.session.save(_=>{
          res.header('Access-Control-Allow-Origin', req.headers.origin);
          res.send(req.session.user);
        });
      } else {
        var user = {
          facebookID: req.body.facebook_id,
          userName: req.body.facebook_name,
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
    })
    .catch(err=>{
      console.error(err);
    });
  }
}
