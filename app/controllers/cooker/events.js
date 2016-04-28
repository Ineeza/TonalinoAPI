import Mapper from './_middleware/mapper.js';

export default {
  create: (req, res)=>{
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    var params = req.body,
        user = req.session.user;
 
    params = Mapper.f2b(params);
    console.log(params);

    req.models.Event.qCreate(params)
      .then(data=>{
        res.status(200).send(true);
      })
      .catch(err=>{
        res.status(503).send(false);
      });

  }
}
