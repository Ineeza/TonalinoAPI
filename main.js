let connection = (process.env.NODE_ENV === "production") ? { host: "0.0.0.0", port: 80 } : { host: "localhost", port: 3000 };

import express from "express";
var app = express();
import mysqlSession from "connect-mysql-session";
MySQLSessionStore = mysqlSession(express);

import session from "express-session";

import router from './app/router';

// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
let sessionStore = express.session({
  store: new MySQLSessionStore("tonalino", "root", "root", {}),
  secret: "keyboard cat"
});

app.use(sessionStore);

router.run(app);

console.log(connection);
app.listen(connection.port, connection.host);
