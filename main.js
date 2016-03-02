let connection = (process.env.NODE_ENV === "production") ? { host: "0.0.0.0", port: 80 } : { host: "localhost", port: 3000 };

import express from "express";
var app = express();

import session from "express-session";
import mysqlStore from "connect-mysql";
let MySQLStore = mysqlStore(session);

let options = {
  config: {
    database: 'tonalino',
    user: 'root',
    password: 'root'
  }
};

let sessionStore = session({
  store: new MySQLStore(options),
  secret: "supersecretkeygoeshere",
  saveUninitialized: true,
  resave: true
});
app.use(sessionStore);

import router from './app/router';
router.run(app);

console.log(connection);
app.listen(connection.port, connection.host);
