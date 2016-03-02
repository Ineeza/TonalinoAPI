let host = "localhost";
let port = 3000;

import express from "express";
var app = express();
import session from "express-session";

import router from './app/router';

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

router.run(app);

app.listen(port, host);
console.log(host, port);
