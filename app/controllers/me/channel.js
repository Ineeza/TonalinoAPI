import qs from 'querystring';
import request from "request";

var config = {
  sendbird: {
    app_id: "664BD574-2C7D-4CB6-8760-BC775463F663",
    api_token: "9866af32f5ad865bdb65be96dd407deb63c20e49"
  }
}





  var sendbird_request = (method, path, data={})=>{
    return new Promise((resolve, reject)=>{
      var options = {
        uri: `http://api.sendbird.com${path}`,
        method: method,
        json: true,
        headers: { 'content-type': "application/json" }
      }
      if(method === "GET") options.uri += `?${qs.encode(data)}`;
      else options.body = data;
      request(options, (error, response, body)=>{
        if(!error) resolve(body);
        else reject(error);
      });
    });
  }

export default {
  index: (req, res)=>{
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  },
  create: (req, res)=>{
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    var params = req.body;
    params.auth = "9866af32f5ad865bdb65be96dd407deb63c20e49";

    sendbird_request("POST", "/channel/create", params)
    .then(data=>{
      res.send(data);
    })
    .catch(err=>{
      res.status(503).send(err);
    });
  }
}

