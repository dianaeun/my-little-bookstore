## Overview

The source codes for the project are classified into two categories: front-end and back-end.

The frontend is connected to our backend server; 'Fetch books', 'Add book', 'Delete book', 'Discussion', 'Login', etc functonalities can actually fetch or add data by accessing our MongoDB.

To explore our application, there are two options avaiable below.

## 1. Using deployed application
    https://my-little-bookstore.herokuapp.com/
You can access our application from the link above.
However, for the full experience to our application, please do the following before performing any other action.
### In a terminal
```bash
npm install
npm start
```
Since our deployment does not support graphql yet, we ask you to run the local server as well.
Opening the above link alone will show you all the frontend designs, but login and all the other cool features are not going to be supported.

## 2. Using a local server
Please do the following in order to run the local server.
### In a terminal
```bash
npm install
npm run dev
```
This will open up the web application "My Little Bookstore" so that you can enjoy the experience.

## Deployment
Since we are using Heroku for deployment and it supports Automatic deploys when connected with Github, any push to masters to this repository will cause an automatic deployment. For deployment containing major features, pleas update the version in package.json file to indicate changes.
Currently, our application is version 1.0.0 since this is our beta release.

For tracking ideas, enhancements, tasks, or, most importantly, bugs, we use Github Issues.  
One can access Github Issues by simply clicking the Issues tab on the top of the repository page.  
Checking and reporting bugs are supported.

**We assume that you operate the both the front-end and back-end components of our application on MacOS or Windows.**
