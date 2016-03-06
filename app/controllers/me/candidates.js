export default {
  index: (req, res)=>{
    req.models.User
    .qFind({ role: req.session.user.role }).then(users=>{
      var excluded_users = users.filter(user=>{
        return user.id != req.session.user.id;
      });
      res.send(excluded_users);
    });
  }
}
