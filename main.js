// import
import express from "express";
import session from "express-session";
import corser from 'corser';
import mysqlStore from "connect-mysql";
import router from './app/router';
import orm from 'orm';
import qOrm from 'q-orm';
import UserModel from './app/models/user.js';
import bodyParser from 'body-parser';
import methodOverride from "method-override";


// vars
let connection = (process.env.NODE_ENV === "production") ? { host: "0.0.0.0", port: 80 } : { host: "localhost", port: 3000 };
let options = {
  config: {
    database: 'tonalino',
    user: 'root',
    password: 'root'
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
    models.User = UserModel.init(db);
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
