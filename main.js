// import
import express from "express";
import session from "express-session";
import corser from 'corser';
import mysqlStore from "connect-mysql";
import router from './app/router';
import orm from 'orm';
import qOrm from 'q-orm';
import bodyParser from 'body-parser';
import methodOverride from "method-override";

// Models
import DeviceModel from './app/models/device.js';
import UserModel from './app/models/user.js';
import UserTypeModel from './app/models/user_TYPE.js';
import EventModel from './app/models/event.js';
import EventTypeModel from './app/models/event_TYPE.js';
import EventMemberModel from './app/models/eventMember.js';
import EventMemberTypeModel from './app/models/eventMember_TYPE.js';
import NotificationModel from './app/models/notification.js';
import NotificationTypeModel from './app/models/notification_TYPE.js';
import NotificationIsReadModel from './app/models/notificationIsRead.js';
import ReviewModel from './app/models/review.js';

import sendbird from 'sendbird';

// vars
let connection = (process.env.NODE_ENV === "production") ? { host: "0.0.0.0", port: 80 } : { host: "localhost", port: 3000 };
let options = {
  table:'node_session',
  config: {
    database: 'tonalino',
    user: 'root',
    password: 'root',
  }

};

// main init
var app = express();

// session init
let MySQLStore = mysqlStore(session);
let sessionStore = session({
  store: new MySQLStore(options),
  secret: "supersecretkeygoeshere",
  saveUninitialized: true,
  resave: true
});



// CORS
app.use(methodOverride());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  let allowed_headers = [
   'Content-Type',
   'Authorization',
   'Access-Control-Allow-Origin',
   'Origin',
   'access-control-allow-credentials',
   'access-control-allow-origin',
   'content-type'
  ].join(", ");
  res.header('Access-Control-Allow-Headers', allowed_headers);
  res.header('Access-Control-Allow-Credentials', 'true');

  if ('OPTIONS' == req.method) {
    res.status(200).send();
  } else {
    next();
  }
};
app.use(allowCrossDomain);


// orm init
app.use(qOrm.qExpress(`mysql://${options.config.user}:${options.config.password}@${connection.host}/${options.config.database}`, {
  define: (db, models, next)=>{
    models.Device = DeviceModel.init(db);
    models.User = UserModel.init(db);
    models.UserType = UserTypeModel.init(db);
    models.Event = EventModel.init(db);
    models.EventType = EventTypeModel.init(db);
    models.EventMember = EventMemberModel.init(db);
    models.EventMemberType = EventMemberTypeModel.init(db);
    models.Notification = NotificationModel.init(db);
    models.NotificationType = NotificationTypeModel.init(db);
    models.NotificationIsRead = NotificationIsReadModel.init(db);
    models.Review = ReviewModel.init(db);
    db.qSync().then(next);
  }
}));

// register middlewares
app.use(sessionStore);
app.use(corser.create());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// run
router.run(app);
console.log(connection);
app.listen(connection.port, connection.host);


process.on("exit", (a,b)=>{
  console.log(a,b);
});

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
