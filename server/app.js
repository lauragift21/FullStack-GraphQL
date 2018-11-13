const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose =  require('mongoose');

const app = express();

// connect to m-lab database
mongoose.connect('mongodb://lauragift21:ndudi222@ds031968.mlab.com:31968/fullstack-gql', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
  schema, // schema for defining graphql data
  graphiql: true
}));

app.listen(4000, () => {
  console.log('App is running on port 4000');
})