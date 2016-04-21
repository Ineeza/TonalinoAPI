import Mapper from './_middleware/mapper';

export default {

  index: (req, res)=>{
    console.log(req.query);
    req.models.User.qFind({ user_ID: req.query.userID }).then(users=>{
      console.log(users.length);
      users = users.map(user=>{
        return Mapper.b2f("User", user);
      });
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
          user.userID = _user.user_ID;
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
