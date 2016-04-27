import cloudinary from 'cloudinary';

export default {
  create: (req, res)=>{
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    cloudinary.config({ cloud_name: "tonalino-uploader", api_key: 266983119754772, api_secret: "axwyImL1BjHg26lAx_YRaf-BZBk" });

    cloudinary.uploader.upload(req.body.image, result=>{
      res.send(result.url);
    })
  }
}
