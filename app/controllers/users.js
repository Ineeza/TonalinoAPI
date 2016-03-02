export default {
  create: (req, res)=>{
    // もしここにアクセスしたユーザーのfacebook_idが
      // 既にDBに存在してたらcreateなし、SessionIDを作成してuser_idを保存して、session_idを返してあげる
      // DBに存在してなかったらcreateあり、session_idを返す
    let data = {
      facebook_id: "xxxxxxxxx",
      facebook_name: "xxxxxxxxxx"
    };
    let obj = {
      id: data.facebook_id,
      user_name: data.facebook_name,
      role: "eater"
    };
    res.send(obj);
  }
}
