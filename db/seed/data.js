import _ from "lodash";

var regToken = 'dCNIYW8tdtU:APA91bFmkbmO6lRJ_98bAqZ5EZ3KrpACM4R1WWg1Qhsw5DcsTCTP8btlojaxbQ3w64urMSyvrBJSP6YGhZVXKz_0g7uCKA8IsICa3BtZeBYiqaGl6jJ5FACohmIYopqlgSDbltJaapAb';

var randID = (obj) => 1 + Math.floor( Math.random() * obj.length );



var user_types = [];
user_types.push({ name: "EATER" });
user_types.push({ name: "COOKER" });

var event_types = [];
event_types.push({ name: "EAT_IN" });
event_types.push({ name: "TAKE_OUT" });

var event_member_types = [];
event_member_types.push({ name: "ATTENDANCE" });
event_member_types.push({ name: "ABSENCE" });

var notification_types = [];
notification_types.push({ name: "PUBLICLY_USER_JOINED"  });
notification_types.push({ name: "INVITED"  });



var users = [];
for(var i=1; i < 10; i++){
  users.push({
    user_Type_ID: randID(user_types), name: `DummyUser${i}`,
    API_facebook_ID: "", API_line_ID: "", description: "", picture: "",
    email: "", postalCode: "154-0001", area: ""
  });
}


var devices = [];
for(var i=1; i < 10; i++){
  devices.push({ user_ID: randID(users), info: "iOS", registration_ID: regToken });
}


var events = [];
for(var i=1; i < 10; i++){
  var t = new Date();
  var start_date = new Date(t.setDate(t.getDate() + 3));
  var end_date = new Date(t.setDate(t.getDate() + 6));
  events.push({
    event_Type_ID: randID(event_types), title: `DummyEvent${i}`,
    description: "", coverPicture: "", price: 1000, seats: 1000, Start_Date: start_date, End_Date: end_date
  });
}


var event_members = [];
for(var i=1; i < 30; i++){
  event_members.push({ event_ID: randID(events), user_ID: randID(users), eventMember_Type_ID: randID(event_member_types) });
}


var notifications = [];
for(var i=1; i < 30; i++){
  notifications.push({ title: 'イベントが作成されました。コーヒー売ります。', event_ID: randID(events), user_ID: randID(users), notification_Type_ID: randID(notification_types) });
}


var notification_is_reads = [];
for(var i=1; i < 10; i++){
  notification_is_reads.push({ notification_ID: randID(notifications), user_ID: randID(users), isRead: false });
}


var reviews = [];
for(var i=1; i < 10; i++){
  reviews.push({ Start_user_ID: randID(users), End_user_ID: randID(users), description: `review${i}`, rate: Math.floor(Math.random()*5*10)/10 });
}

export default {
  devices: devices,
  users: users,
  user_types: user_types,
  events: events,
  event_types: event_types,
  event_members: event_members,
  event_member_types: event_member_types,
  notifications: notifications,
  notification_types: notification_types,
  notification_is_reads: notification_is_reads,
  reviews: reviews
}
