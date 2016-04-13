export default {
  index: (req, res)=>{
    let user = req.session.user;
    let candidate_role = (user.role === "eater") ? "cooker" : "eater";
    req.models.User
    .qFind({}).then(users=>{
      var excluded_users = users.filter(user=>{
        return user.userID != req.session.user.userID;
      });
      console.log('candidates', excluded_users.length);
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.send(excluded_users);
    });
  }
}
