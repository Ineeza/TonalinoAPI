export default {
  index: (req, res)=>{
    let user = req.session.user;
    let candidate_role = (user.role === "eater") ? "cooker" : "eater";
    req.models.User
    .qFind({ role: candidate_role }).then(users=>{
      var excluded_users = users.filter(user=>{
        return user.id != req.session.user.id;
      });
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.send(excluded_users);
    });
  }
}
