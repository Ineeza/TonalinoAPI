export default {
  show: (req, res)=>{
    console.log('/me/show accessed');

    let obj = {
      id: 1,
      user_name: "shogo",
      role: "cooker"
    };
    res.send(obj);
  },
  update: (req, res)=>{
    res.send(true);
  }
}
