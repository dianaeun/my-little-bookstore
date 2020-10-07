# Welcome!

To explore our front-end, you should first clone the repository.

```bash
git clone https://github.com/CSE416-Traders/CSE416_Group_Project.git
```


## Installation

Go to the 'project_mlb' folder and use the npm to install the required libraries.

```bash
cd project_mlb
npm install
```

Following is to start the project through npm!

```bash
npm start
```

## Notice

Several functional interactions are implemented in this project. (Modals, logout, login, etc.)

Also, the contents of the navigation bar will differ depending on whether you are logged-in or logged out.  
Please login to access all functionalities.  
*My Bookstore & Profile* pages are not visible when logged out.  
When not logged in, the main page displays a list of books in all genres and locations, sorted by rating. Only after logging in the page shows books filtered by the user's preferred genres and location. Nevertheless, for the purpose of showing our functional requirements, our current implementation will assume the user is logged in at all times in the Main page.  

## Instruction for Running Our Application

A user will first be directed to the Premain page, in which he/she can click the "Learn" and "Get Started" buttons. Functionalities related to the "Learn" button are not implemented at the moment. By pressing the "Get Started" button, the user proceeds to the Main page and views the list of recommended books, filtered by the user's preferred genres.

When not logged in, the user can access three pages: the Main page, the Browse page, and the Discussion page.
In the Browse page, the user can search for books by various categories, including title, author, and ISBN. Moreover, an advanced search functionality that supports filtering by genre and location is supported. The list of books matching the search can be sorted by rating, price, or alphabetical order.
In the Discussion page, the user can start a discussion about a specific book by clicking the "Add Discussion" button. Also, searching for particular discussions by the tag (i.e., book title), title, or content, the user can actively participate in ongoing discussions. The contents of such discussions found are not visible by default and can be viewed by clicking the "show" button.

When the user logs in, he/she can further access the My Bookstore page and the Profile page. The former displays the list of books the user has uploaded to sell. Adding, deleting, or editing information about such books are supported. By clicking each book's title, the user proceeds to the Book Information page that contains detailed information about the corresponding book. The latter contains personal information about the user, all of which can be edited. Moreover, the Profile page displays buy requests sent by other users. The user can decide whether to accept or decline such incoming requests. 
