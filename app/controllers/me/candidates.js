export default {
  index: (req, res)=>{
    let user = req.session.user;
    req.models.User
    .qFind({ role: user.role }).then(users=>{
      var excluded_users = users.filter(user=>{
        return user.id != req.session.user.id;
      });
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.send(excluded_users);
    });
  }
}
