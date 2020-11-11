const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS')
        return res.sendStatus(200);
    next();
});


const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const { graphqlHTTP } = require('express-graphql');
app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    })
);

const mongoose = require('mongoose');
mongoose
    .connect(process.env.MONGODB_URI || `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.oszf0.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(process.env.PORT || 8000);
    })
    .catch(err => {
        console.log(err)
    });

module.exports = {mongoose}

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === 'staging') {

    // Set static folder
    app.use(express.static("frontend/build"));
    
    // index.html for all page routes
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
}

const port = process.env.PORT || 8000;