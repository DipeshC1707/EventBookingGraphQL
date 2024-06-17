const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const graphQLSchema = require('./graphql/schema/index')
const graphQLResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');
const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use('/graphql', graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
}))

console.log(process.env.MONGO_PASSWORD);

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@eventbs.qfzybzf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=EventBS`)
    .then(() => {
        app.listen(4000, () => {
            console.log('listening on port 4000');
        })
    }).catch(err => {
        console.log(err);
})

