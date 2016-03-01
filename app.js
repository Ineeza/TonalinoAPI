var express = require("express"),
    app = express();
    session = require('express-session'),
    graphqlHTTP = require('express-graphql');


app.use('/graphql', graphqlHTTP({ schema: MyGraphQLSchema, graphiql: true }));

app.get('/', function (req, res) {
  res.send('Hello, World!');
});

app.listen(3000);
