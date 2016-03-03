export default {
  create: (req, res)=>{
    console.log('user create', req);
    req.models.user.qCreate({
      id: 1,
      facebook_id: req.body.facebook_id,
      user_name: req.body.facebook_name,
     role: 'eater'
    }).then(_=>{
    req.models.user.qFind({ facebook_id: req.body.facebook_id }).then(users=>{
      console.log('users', users);
      if(users.length > 0){
        // session create
        res.send(false);
      } else {
        // create user
          // if success session create
        res.send(true);
      }
    });
    });
  }
}
