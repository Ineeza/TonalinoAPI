export default {
  create: (req, res)=>{
    console.log('user create body', req.body);
    console.log('user create query', req.query);
    console.log('user create params', req.params);
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
  }
}
