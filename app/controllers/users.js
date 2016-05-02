import Mapper from "./_middleware/mapper.js";

export default {

  index: (req, res)=>{
    console.log(req.query.userID);
    req.models.User.qFind({ user_ID: req.query.userID }).then(users=>{
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      var _users = users.map(user=> Mapper.b2f("User", user) );
      console.log(_users.length);
      res.send(_users);
    })
    .catch(err=>{
      console.error(err);
      res.status(503).send(err);
    });
  },

  create: (req, res)=>{
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    console.log('users_controller.create', req.body);
    req.models.User.qFind({ API_facebook_ID: req.body.facebook_id })
    .then(users=>{
      console.log('users', users.length);
      if(users.length > 0){
        req.session.user = users[0];
        req.session.save(_=>{
          res.send(req.session.user);
        });
      } else {
        var user = {
          API_facebook_ID: req.body.facebook_id,
          name: req.body.facebook_name,
          email: req.body.email,
          picture: req.body.picture
        };
        req.models.User.qCreate(user).then(_user=>{
          req.session.user = _user;
          req.session.save(_=>{
            res.send( Mapper.b2f(req.session.user) );
          });
        }).catch(err=>{
          console.error(err);
          res.send(err);
        });
      }
    })
    .catch(err=>{
      console.error(err);
    });
  }
}
