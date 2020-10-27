## Installation and Execution
We assume that you operate the server and database on MacOS or Windows.

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

### mutation

#### createUser
*createUser* will allow you to create a User in our application.
After you run *createUser*, you should copy the _id for further explorations, listed below. (we assume your _id is "5f976afd74382937987f902f" in this example)
```
mutation{
  createUser(userInput:{email: "haha@haha.com", password: "haha"}){
    email
    password
    _id
  }
}
```

### createBook
*createBook* allows you to create a Book. For the input of 'owner', you should paste in your user id that was copied in the previous step.
Again, you need to copy the id of the book to explore the *deleteBook* function.
```
mutation{
  createBook(bookInput: {title: "Abook", date: "2020-10-27T00:41:11.028Z", publisher: "Apublisher", author:"Amy", isbn: "112124242510", owner: "5f976afd74382937987f902f"}){
    title
    date
    publisher
    author
    isbn
    _id
  }
}
```

### deleteBook
If you want to delete your book, you should type in the id of the target book.
```
mutation{
  deleteBook(bookId: "5f976d349944e23e9fafdd33"){
    _id
    title
    author
  }
}
```

You can see all the books and users that have been created.
For the scope of this instruction, the server assumes the user id as "5f976afd74382937987f902f" to which books belong.
Since we have not implemented retrieiving user Id from the frontend, we set the default userId for our conveniency.


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
