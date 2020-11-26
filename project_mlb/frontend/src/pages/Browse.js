import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import {Form, Dropdown, DropdownButton, Row, Col, Button} from 'react-bootstrap';
import MlbNavbar from '../components/NavigationBar.js';
import AuthContext from '../context/AuthContext';

const star = require("../icons/star.png");
const blankStar = require("../icons/blank_star.png");

class Browse extends Component{
    state = { 
        books:[], 
        //genre: "All",
        searchBook : false,
        isLoadingBook: false,
        search : "",
        searchTerm : "",
        sort : "All",
        filter : "",
        liked : [],
        sortedbook : [],
        sortbyradio : [],
        sortbygenre : []
        
    };
    static contextType = AuthContext;

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks() {
        const requestBody = {
            query: `
                query{
                    books{
                        title
                        author
                        publisher
                        rating{
                            _id
                            rating
                            raters
                        }
                        genre
                        price
                        isbn
                    }
                }
            `
        }
        fetch('/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed to fetch books!")
            }
            return res.json()
        })
        .then(resData => {
            console.log("Books are successfully fetched! ", resData);
            const books = resData.data.books;
            //let check = this.state.books;
            if(this.state.sort === "price")
                books.sort((a, b) => b.price - a.price);

            else if(this.state.sort === "Alphabet")
                books.sort((a,b) => a.title.localeCompare(b.title));
            else;
                // if(this.state.filter === "Horror")
                //     books.filter((temp) => temp.genre.includes("Horror"));
                //     books.filter(function(temp){return temp.genre.includes("Romance")});
            this.setState({books: books, sortedbook: books, sortbygenre: books});
        })
        .catch(err => { console.log(err);});
    };
    handleGenre = (filter) => {
        let books = this.state.sortbygenre;
        console.log(books);
        if (filter === "Horror"){
            
            books = this.state.sortedbook.filter((temp) => temp.genre.includes("Horror"));
        }

        else if (filter === "Romance"){
            
            books = this.state.sortedbook.filter((temp) => temp.genre.includes("Romance"));
        }

        else if (filter === "Science"){
            
            books = this.state.sortedbook.filter((temp) => temp.genre.includes("Science"));
        }

        else if (filter === "Fantasy"){
            books = this.state.sortedbook.filter((temp) => temp.genre.includes("Fantasy"));
        }

        else if (filter === "Adventure"){
            books = this.state.sortedbook.filter((temp) => temp.genre.includes("Adventure"));
        }

        else if(filter === "Autobiography")
            books = this.state.sortedbook.filter((temp) => temp.genre.includes("Autobiography"));
        
        this.setState({books: books});
        console.log(books);
      }

      handleSearchBook = (event, search, searchTerm, filter) => {
        event.preventDefault();
        let books = this.state.books;
        
        if (search === "Title" && filter === "Romance")
            
          books = this.state.sortedbook.filter(function(book){
              let temp = book.genre.includes("Romance");
              console.log("let check temp",temp);
              return temp.title.toLowerCase().includes(searchTerm.toLowerCase())});

        else if (search === "Author")
          books = this.state.sortedbook.filter(function(book){return book.author.toLowerCase().includes(searchTerm.toLowerCase())});
        else if (search === "ISBN")
            books = this.state.sortedbook.filter(function(book){return book.isbn.toLowerCase().includes(searchTerm.toLowerCase())});
            if(filter === "Romance"){
                books = this.state.sortedbook.filter((temp) => temp.genre.includes("Romance"));
                console.log("filtering",books);
            }
        else 
          books = this.state.sortedbook.filter(function(book){
            return  book.title.toLowerCase().includes(searchTerm.toLowerCase())            
            || book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
            || book.author.toLowerCase().includes(searchTerm.toLowerCase())});
            
        this.setState({books: books});
        console.log("I want check",books);

      }


    createStar = (n) => {
        let stars = [];
        for (let i = 0; i < n; i++){
            stars.push(<img src={star} alt="star" style={{ width: "22px" }} />);
        }
        for (let i = n; i < 5; i++) {
            stars.push(<img src={blankStar} alt="star" style={{ width: "22px" }} />);
        }
        return <td>{stars}</td>
    }
    

    render(){

        return (
            <React.Fragment>
                <MlbNavbar/>
                <div style={{width: "80%", margin: "auto", marginTop: "2rem"}}>
                    <div style={{}}>
                    <Form style={{marginTop: "2rem"}} onSubmit={(event) => this.handleSearchBook(event, this.state.search, this.state.searchTerm)}> 
                        <Form.Group as={Row}>
                            <Col sm={5}>
                            <Form.Control type="text" placeholder="Search Term" onChange={(event) => this.setState({searchTerm: event.target.value})}/>
                            </Col>                
                            <Button style={{fontWeight: "bold", background: "#FAC917", color: "black", border: "1px solid #FAC917", opacity: "79%"}} type="submit">Search</Button>
                            <DropdownButton id="dropdown" variant="outline-secondary" title="All Categories" style={{marginLeft: "1rem"}} >
                            <Dropdown.Item eventKey='All Categories' onClick={()=>{document.getElementById("dropdown").innerHTML="All Categories"; this.setState({search: "All"});}}>All Categories</Dropdown.Item>
                            <Dropdown.Item eventKey="Title" onClick={()=>{document.getElementById("dropdown").innerHTML="Title"; this.setState({search: "Title"}); this.setState({filter: "Horror"})}}>Title</Dropdown.Item>
                            <Dropdown.Item eventKey="Author" onClick={()=>{document.getElementById("dropdown").innerHTML="Author"; this.setState({search: "Author"});}}>Author</Dropdown.Item>
                            <Dropdown.Item eventKey="ISBN" onClick={()=>{document.getElementById("dropdown").innerHTML="ISBN"; this.setState({search: "ISBN"}); }}>ISBN</Dropdown.Item>
                            </DropdownButton>
                        </Form.Group>
                        </Form>
                        <h5>Advanced Search</h5>
                        <Form>
            
                            <Table borderless size="sm" style={{ maxWidth: "700px"}}>
                            
                            <tr>
                                <td>
                                <Form.Label>Genre</Form.Label>
                                </td>
                                <td>
                                {/* <Form.Check inline label='Romance' type='radio' name='genre' id='romance' onClick = {() => {this.setState({filter: "Romance"}); this.fetchBooks();}}/> */}
                                <Form.Check inline label='Romance' type='radio' name='genre' id='romance' onClick = {() => {this.handleGenre("Romance");}}/>
                                <Form.Check inline label='Horror' type='radio' name='genre' id='horror' onClick={() => { this.handleGenre("Horror");}}/>
                                <Form.Check inline label='Fantasy' type='radio' name='genre' id='fantasy' onClick={() => {this.handleGenre("Fantasy");}}/>
                                <Form.Check inline label='Adventure' type='radio' name='genre' id='adventure' onClick={() => {this.handleGenre( "Adventure");}}/>
                                <Form.Check inline label='Science' type='radio' name='genre' id='science' onClick={() => {this.handleGenre("Science");}}/>
                                <Form.Check inline label='Autobiography' type='radio' name='genre' id='autobiography' onClick={() => {this.handleGenre("Autobiography");}}/>
                                
            
                                </td>
                            </tr>
                        
                            <tr>
                                <td><Form.Label>Location Level</Form.Label></td>
                                <td>
                                    <Form.Check inline label='Dong' name='level' type='radio' id='Dong' />
                                    <Form.Check inline label='Gu' name='level' type='radio' id='Gu' />
                                    <Form.Check inline label='City' name='level' type='radio' id='City' />
                                    <Form.Check inline label='State' name='level' type='radio' id='State' />
                                    <Form.Check inline label='Whole' name='level' type='radio' id='Whole' />
                                    
                                </td>
                            </tr>
                            </Table>
                        </Form>
                    </div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop:"3rem"}}>
                            <h3>Search Results</h3>
                            <div key={`inline-radio`} >
                                <Form style={{border:"solid grey", borderRadius:"0.2rem", float:"right", margin:"0.3rem", fontSize: "0.85rem", padding: "0.2rem"}}>
                                    <Form.Label style={{margin: "0.3rem"}}>Sort By </Form.Label>
                                    <Form.Check inline label='Price' type='radio' name='sort' id='price' onClick={() => {this.setState({sort: "price"}); this.fetchBooks();}}/>
                                    <Form.Check inline label='Alphabet' type='radio' name='sort' id='alphabet' onClick={() => {this.setState({sort: "Alphabet", sortbyradio: []}); this.fetchBooks();}}/>
                                </Form>
                            </div>
                        </div>
                    <Table size="sm" style={{ minWidth: "1000px", margin: "auto", marginTop:"1.5rem"}}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Avg. Rating</th>
                                <th>Highest Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {items} */}
                            {this.state.books.map((book,i) => 
                              <tr>                            
                              <td><Link href="#">{book.title}</Link></td>
                              <td><Link href="#">{book.author}</Link></td>
                            <td>{book.genre}</td>                                                
                              <td style={{width:"10rem"}}>
                                {this.createStar(book.rating.rating)}
                              </td>
                              <td>${book.price}</td>
                            </tr>  
                          
                            )}

                        </tbody>
                    </Table>
                </div>
            </React.Fragment>
        )
    }
}

export default Browse;
