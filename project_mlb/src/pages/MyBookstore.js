import React, {Component} from 'react';
import {Button, Table, Jumbotron, Container} from 'react-bootstrap';
import AddBookModal from '../components/AddBookModal';
import DeleteBookModal from '../components/DeleteBookModal';
import Advertisement from '../components/Advertisement';
const star = require("../icons/star.png");

class MyBookstore extends Component{
    state={
        addBook : false,
        deleteBook : false
    }
    books = [
      { date: '2019/09/04', title: 'Harry Potter and the Philosopher', author: 'J.K. Rowling', price: 15.00, rate: 5 },
      { date: '2019/09/04',title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', price: 16.00, rate: 5 },
      { date: '2019/09/28',title: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling', price: 15.00, rate: 4 },
      { date: '2020/01/05',title: 'Harry Potter and the Order of the Phoenix', author: 'J.K. Rowling', price: 17.00, rate: 5 },
      { date: '2020/05/17',title: 'Harry Potter and The Goblet of Fire', author: 'J.K. Rowling', price: 20.00, rate: 3 },
      { date: '2020/06/25',title: 'Harry Potter and the Half-Blood Prince', author: 'J.K. Rowling', price: 10.00, rate: 4 },
      { date: '2020/07/30',title: 'Harry Potter and the Deathly Hallows – Part 1', author: 'J.K. Rowling', price: 13.00, rate: 4 },
      { date: '2020/08/01',title: 'Harry Potter and the Deathly Hallows – Part 2', author: 'J.K. Rowling', price: 30.00, rate: 3 },
    ];
    handleClose = () => {
      this.setState({deleteBook: false, addBook: false});
    }
    handleAddBook = () => {
      this.setState({addBook: true});
    }
    handleDeleteBook = () => {
      this.setState({deleteBook: true});
    }
    createStar = (n) => {
      let stars = [];
      for (let i = 0; i < n; i++){
        stars.push(<img src={star} alt="star" style={{ width: "22px" }} />);
      }
      return <td>{stars}</td>
    }
    render(){
        return (
            <div>
                <AddBookModal show={this.state.addBook} handleClose={this.handleClose}/>
                <DeleteBookModal show={this.state.deleteBook} handleClose={this.handleClose}/>
                <Jumbotron fluid>
                  <Container>
                    <h1>DongHun's Bookstore</h1>
                  </Container>
                </Jumbotron>
                <Table size="sm" style={{ width: "1000px", marginLeft: "auto", marginRight: "auto"}}>
                  <thead>
                    <tr>
                      <th>Date Added</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Price</th>
                      <th>Rating</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.books.map((book) => (    
                      <tr>
                        <td>{book.date}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.price}</td>
                        {this.createStar(book.rate)}                       
                        <td><Button variant="danger" onClick={this.handleDeleteBook}>Delete Books</Button></td>
                      </tr>
                    ))}
                  </tbody>
                  <Button variant="info" onClick={this.handleAddBook}>Add Books</Button>
                </Table>
                <Advertisement/>
                
                
            </div>
        )
    }
}

export default MyBookstore;
