export default {
  show: (req, res)=>{
    res.status(200).send(req.session.user);
  },

  update: (req, res)=>{
    console.log('update start', req.body);
    Object.keys(req.body).map(key=>{
      req.session.user[key] = req.body[key];
    });
    console.log('update session', req.session.user);
    req.models.User.qFind({ id: req.session.user.id })
    .then(users=>{
      users[0].save(req.session.user, function(err, user){
        console.log('updated user', req.session.user);
        req.session.save(_=>{
          res.send(req.session.user);
        });
      });
    })
  },

  delete: (req, res)=>{
    req.session.destroy(function(err) {
      res.send(true);
    })
  }
}
