import express from "express";
import session from "express-session";
import corser from 'corser';
import mysqlStore from "connect-mysql";
import router from './app/router';

let connection = (process.env.NODE_ENV === "production") ? { host: "0.0.0.0", port: 80 } : { host: "localhost", port: 3000 };
let options = {
  config: {
    database: 'tonalino',
    user: 'root',
    password: 'root'
  }
};

var app = express();
let MySQLStore = mysqlStore(session);
let sessionStore = session({
  store: new MySQLStore(options),
  secret: "supersecretkeygoeshere",
  saveUninitialized: true,
  resave: true
});


app.use(sessionStore);
app.use(corser.create());
router.run(app);
console.log(connection);
app.listen(connection.port, connection.host);
