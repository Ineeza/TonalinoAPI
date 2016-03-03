export default {
  index: (req, res)=>{
    console.log(req.session.user);
    req.models.User.qFind({ role: req.session.user.role })
    .then(users=>{
      let _users = users.map(user=>{
        return {
          id: user.id,
          user_name: user.user_name,
          channel_url: "",
          role: user.role
        }
      });
      res.send(_users);
    });
  }
}
