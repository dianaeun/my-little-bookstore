## Installation and Execution
*We assume that you operate the server and database on MacOS or Windows.*

To test an interaction between our server and database (MongoDB), you can use GraphiQL, a graphical interactive in-browser GraphQL IDE.

```bash
cd project_mlb/backend
npm install
npm start
```
If you execute npm start, it will automatically run nodemon which automatically compiles and reruns the server on any changes.

Once you run 'npm start', you can access 'http://localhost:8000/graphql' to test interactions using GraphiQL.  
Example queries and mutations are list below.  

## GraphiQl

### queries
```
query{
  books{
    title
    _id
  }
}
```

```
query{
  users{
    _id
    email
  }
}
```
### mutation

#### createUser
the createUser mutation will allow us to create users in our application
```
mutation{
  createUser(userInput:{email: "haha@haha.com", password: "haha"}){
    email
    password
  }
}
```

### createBook

```
mutation{
  createBook(bookInput: {title: "Abook", date: "2020-10-27T00:41:11.028Z", publisher: "Apublisher", author:"Amy", isbn: "112124242510", owner: "5f976afd74382937987f902f"}){
    title
    date
    publisher
    author
    isbn
  }
}
```

### deleteBook

```
mutation{
  deleteBook(bookId: "5f976d349944e23e9fafdd33"){
    _id
    title
    author
  }
}
```
