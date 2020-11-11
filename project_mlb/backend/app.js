const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const expressPlayground = require("graphql-playground-middleware-express").default;
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS')
        return res.sendStatus(200);
    next();
});

const config = require("./config/key");

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

//app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

const mongoose = require('mongoose');
const connect = mongoose
    .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected...')
    })
    .catch(err => {
        console.log(err)
    });

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === 'staging') {

    // Set static folder
    app.use(express.static("frontend/build"));
    
    // index.html for all page routes
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
}

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});