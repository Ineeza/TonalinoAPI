export default {
  show: (req, res)=>{
    res.send(req.session.user);
  },

  update: (req, res)=>{
    Object.keys(req.body).map(key=>{
      req.session.user[key] = req.body[key];
    });
    req.models.user.qUpdate(req.session.user).then(_user=>{
      req.session.save(_=>{
        res.send(_user);
      });
    });
  },

  delete: (req, res)=>{
    req.session.destroy(function(err) {
      res.send(true);
    })
  }
}
