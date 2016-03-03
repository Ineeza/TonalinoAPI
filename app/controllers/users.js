export default {
  create: (req, res)=>{
    console.log('user create');
    req.models.user.qFind({ facebook_id: req.body.facebook_id }).then(users=>{
      console.log(users);
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
