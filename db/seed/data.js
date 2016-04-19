import _ from "lodash";

var regToken = 'dCNIYW8tdtU:APA91bFmkbmO6lRJ_98bAqZ5EZ3KrpACM4R1WWg1Qhsw5DcsTCTP8btlojaxbQ3w64urMSyvrBJSP6YGhZVXKz_0g7uCKA8IsICa3BtZeBYiqaGl6jJ5FACohmIYopqlgSDbltJaapAb';

var randID = (obj) => { Math.floor( Math.random() * obj.length ) ; }



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
for(i=1; i < 10; i++){
  users.push({
    FK_user_TYPE_ID: i, name: `DummyUser${i}`,
    facebook_ID: "", line_ID: "", description: "", picture: "",
    email: "", postalCode: "154-0001", area: ""
  });
}


var devices = [];
for(i=1; i < 10; i++){
  devices.push({ FK_user_ID: randID(users), info: "iOS", registration_ID: regToken });
}


var events = [];
for(i=1; i < 10; i++){
  var t = new Date();
  var from_d = new Date(t.setDate(t.getDate() + 3));
  var to_d = new Date(t.setDate(t.getDate() + 6));
  events.push({
    FK_user_TYPE_ID: randID(event_types), title: `DummyEvent${i}`,
    description: "", coverPicture: "", price: 1000, seats: 1000, FROM_DATE: from_d, TO_DATE: to_d
  });
}


var event_members = [];
for(i=1; i < 30; i++){
  event_members.push({ FK_event_ID: randID(events), FK_user_ID: randID(users), FK_eventMember_TYPE_ID: randID(event_member_types) });
}


var notifications = [];
notifications.push({ FK_event_ID: randID(events), FK_user_ID: randID(users),  });


var notification_is_reads = [];
for(i=1; i < 10; i++){
  notification_is_reads.push({ FK_notification_ID: randID(notifications), FK_user_ID: randID(users), isRead: false });
}


var reviews = [];
for(i=1; i < 10; i++){
  reviews.push({ FK_FROM_user_ID: randID(users), FK_TO_user_ID: randID(users), description: `review${i}`, rate: Math.floor(Math.random()*5*10)/10 });
}

export default {
  devices: devices
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
