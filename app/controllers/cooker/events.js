import Mapper from '../_middleware/mapper.js';

export default {
  create: (req, res)=>{
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    var params = req.body,
        user = req.session.user;
 
    console.log(req);
    console.log(params);
    params = Mapper.f2b("Event", params);
    params.user_ID = 1//user.user_ID;

    console.log(params);
    req.models.Event.qCreate(params)
      .then(data=>{
        res.status(200).send(data);
      })
      .catch(err=>{
        res.status(503).send(err);
      });

  }
}
