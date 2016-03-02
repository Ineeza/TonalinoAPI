export default {
  index: (req, res)=>{
    var src = [
      { id: 14, user_name: "くまもん", channel_url: "", role: "cooker" },
      { id: 15, user_name: "桐谷美玲", channel_url: "", role: "cooker" },
      { id: 16, user_name: "JOY", channel_url: "", role: "cooker" },
      { id: "hogehoge", user_name: "はなげ", channel_url: "", role: "cooker" }
    ];
    res.send(src);
  }
}
