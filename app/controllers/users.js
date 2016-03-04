export default {
  index: (req, res)=>{
    var q = req.body.id.map((id,i)=>{
      return `id=${id}${(req.body.id.length-1 !== i) ? " OR " : ""}`;
    }).join("");
    req.models.User
     .find({})
     .where(q)
     .all(users=>{
       console.log(users);
       res.send(users);
     });
  }
  create: (req, res)=>{
    req.models.User.qFind({ facebook_id: req.body.facebook_id }).then(users=>{
      if(users.length > 0){
        console.log(users[0].picture, users[0].email);
        var user = {
          id: users[0].id,
          facebook_id: users[0].facebook_id,
          user_name: users[0].user_name,
          email: users[0].email,
          picture: users[0].picture,
          role: users[0].role,
          description: users[0].description
        };
        req.session.user = user;
        req.session.save(_=>{
          res.send(req.session.user);
        });
      } else {
        var user = {
          facebook_id: req.body.facebook_id,
          user_name: req.body.facebook_name,
          email: req.body.email,
          picture: req.body.picture,
          role: "eater",
          description: ""
        };
        req.models.User.qCreate(user).then(_user=>{
          user.id = _user.id;
          req.session.user = user;
          req.session.save(_=>{
            res.send(req.session.user);
          });
        })
      }
    });
  }
}
