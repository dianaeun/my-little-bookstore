import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import {Form, Dropdown, DropdownButton, Row, Col, Button} from 'react-bootstrap';
import MlbNavbar from '../components/NavigationBar.js';
import AuthContext from '../context/AuthContext';
import { search } from 'superagent';


const star = require("../icons/star.png");
const blankStar = require("../icons/blank_star.png");

class Browse extends Component{
    state = { 
        books:[], 
        search : "",
        searchTerm : "",
        sort : "All",
        filter : "",
        liked : [],
        sortedbook : [],
        init : [],
        check : "all",
        shownReviews: []
    };
    static contextType = AuthContext;
    constructor(){
        super();
    }

    componentDidMount() {
        this.fetchBooks();
    }

    handleShowReview = (target) => {
        let shown = this.state.shownReviews;
        let index = shown.indexOf(-1);
        let i =0;
        console.log("shown",shown);
        //console.log(target);
        console.log("test",index);

        if (target === -1) {
          shown.push(target);
          if(shown.length != 1){
              for(i =0; i<shown.length-1; i++){
                shown.pop()
              }
          }
        } 

        else{
            shown.splice(index, 1)
        }
        this.setState({ shownReviews: shown});
      };

    fetchBooks() {
        const requestBody = {
            query: `
                query{
                    books{
                        _id
                        title
                        author
                        publisher
                        rating{
                            _id
                            rating
                            raters
                        }
                        genre
                        owner{
                            firstName
                            lastName
                            email
                            userID
                            location
                            preferredGenres
                        }
                        price
                        isbn
                    }
                }
            `,
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
            this.setState({books: books, sortedbook: books, init: books});
        })
        .catch(err => { console.log(err);});
    };

    handlePrice = (sort) =>{
        let books = this.state.sortedbook;
        if(sort === "Price"){
            books.sort((a, b) => b.price - a.price);
        }

        else if(sort === "Alphabet"){
            books.sort((a,b) => a.title.localeCompare(b.title));
        }

        else{

        }
        
        this.setState({sortedbook: books, sort: sort});
    }

    handleGenre = (filter) => {

        // let books = this.state.sortedbook;
        // let initialization = this.state.init;
        let books = this.state.init;
        if (filter === "Horror"){
            this.state.check = "horror"
            books = books.filter((temp) => temp.genre.includes("Horror"));
        }

        else if (filter === "Romance"){
            this.state.check = "romance"
            books = books.filter((temp) => temp.genre.includes("Romance"));
        }

        else if (filter === "Science"){
            this.state.check = "science"
            books = books.filter((temp) => temp.genre.includes("Science"));
        }

        else if (filter === "Fantasy"){
            this.state.check = "fantasy"
            books = books.filter((temp) => temp.genre.includes("Fantasy"));
        }

        else if (filter === "Adventure"){
            this.state.check = "adventure"
            books = books.filter((temp) => temp.genre.includes("Adventure"));
        }

        else if(filter === "Autobiography"){
            this.state.check = "autobiography"
            books = books.filter((temp) => temp.genre.includes("Autobiography"));
        }
        else{
            this.state.check = "all"
            books = this.state.init;
        }
        
        this.setState({books: books, sortedbook: books, filter: filter});
      }

      handleSearchBook = (event, search, searchTerm, init) => {
        event.preventDefault();
        let books = init;
    
        if (search === "Title"){
            if(this.state.check === "romance"){
                books = books.filter((temp) => temp.genre.includes("Romance"));
                books = books.filter(function(book){return book.title.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "horror"){
                books = books.filter((temp) => temp.genre.includes("Horror"));
                books = books.filter(function(book){return book.title.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "science"){
                books = books.filter((temp) => temp.genre.includes("Science"));
                books = books.filter(function(book){return book.title.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "fantasy"){
                books = books.filter((temp) => temp.genre.includes("Fantasy"));
                books = books.filter(function(book){return book.title.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "adventure"){
                books = books.filter((temp) => temp.genre.includes("Adventure"));
                books = books.filter(function(book){return book.title.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "autobiography"){
                books = books.filter((temp) => temp.genre.includes("Autobiography"));
                books = books.filter(function(book){return book.title.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else{
                books = books.filter(function(book){return book.title.toLowerCase().includes(searchTerm.toLowerCase())});
            }
        }
          
        else if (search === "Author"){
            if(this.state.check === "romance"){
                books = books.filter((temp) => temp.genre.includes("Romance"));
                books = books.filter(function(book){return book.author.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "horror"){
                books = books.filter((temp) => temp.genre.includes("Horror"));
                books = books.filter(function(book){return book.author.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "science"){
                books = books.filter((temp) => temp.genre.includes("Science"));
                books = books.filter(function(book){return book.author.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "fantasy"){
                books = books.filter((temp) => temp.genre.includes("Fantasy"));
                books = books.filter(function(book){return book.author.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "adventure"){
                books = books.filter((temp) => temp.genre.includes("Adventure"));
                books = books.filter(function(book){return book.author.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "autobiography"){
                books = books.filter((temp) => temp.genre.includes("Autobiography"));
                books = books.filter(function(book){return book.author.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else{
                books = books.filter(function(book){return book.author.toLowerCase().includes(searchTerm.toLowerCase())});
            }

        }
          
        else if (search === "ISBN"){

            if(this.state.check === "romance"){
                books = books.filter((temp) => temp.genre.includes("Romance"));
                books = books.filter(function(book){return book.isbn.toLowerCase().includes(searchTerm.toLowerCase())});
            }
            else if(this.state.check === "horror"){
                books = books.filter((temp) => temp.genre.includes("Horror"));
                books = books.filter(function(book){return book.isbn.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "science"){
                books = books.filter((temp) => temp.genre.includes("Science"));
                books = books.filter(function(book){return book.isbn.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "fantasy"){
                books = books.filter((temp) => temp.genre.includes("Fantasy"));
                books = books.filter(function(book){return book.isbn.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "adventure"){
                books = books.filter((temp) => temp.genre.includes("Adventure"));
                books = books.filter(function(book){return book.isbn.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "autobiography"){
                books = books.filter((temp) => temp.genre.includes("Autobiography"));
                books = books.filter(function(book){return book.isbn.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else{
                books = books.filter(function(book){return book.isbn.toLowerCase().includes(searchTerm.toLowerCase())});
            }

        }

        else{
            
            if(this.state.check === "romance"){
                books = books.filter((temp) => temp.genre.includes("Romance"));
                books = books.filter(function(book){
                    return  book.title.toLowerCase().includes(searchTerm.toLowerCase())            
                    || book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
                    || book.author.toLowerCase().includes(searchTerm.toLowerCase())});
            }
            else if(this.state.check === "horror"){
                books = books.filter((temp) => temp.genre.includes("Horror"));
                books = books.filter(function(book){
                    return  book.title.toLowerCase().includes(searchTerm.toLowerCase())            
                    || book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
                    || book.author.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "science"){
                books = books.filter((temp) => temp.genre.includes("Science"));
                books = books.filter(function(book){
                    return  book.title.toLowerCase().includes(searchTerm.toLowerCase())            
                    || book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
                    || book.author.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "fantasy"){
                books = books.filter((temp) => temp.genre.includes("Fantasy"));
                books = books.filter(function(book){
                    return  book.title.toLowerCase().includes(searchTerm.toLowerCase())            
                    || book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
                    || book.author.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "adventure"){
                books = books.filter((temp) => temp.genre.includes("Adventure"));
                books = books.filter(function(book){
                    return  book.title.toLowerCase().includes(searchTerm.toLowerCase())            
                    || book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
                    || book.author.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else if(this.state.check === "autobiography"){
                books = books.filter((temp) => temp.genre.includes("Autobiography"));
                books = this.state.sortedbook.filter(function(book){
                    return  book.title.toLowerCase().includes(searchTerm.toLowerCase())            
                    || book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
                    || book.author.toLowerCase().includes(searchTerm.toLowerCase())});
            }

            else{
                books = this.state.sortedbook.filter(function(book){
                    return  book.title.toLowerCase().includes(searchTerm.toLowerCase())            
                    || book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
                    || book.author.toLowerCase().includes(searchTerm.toLowerCase())});
            }
                
        }

        this.setState({books: books, sortedbook: books});
      }


      createStar = (n) => {
        let rounded = Math.round(n);
        let stars = [];
        for (let i = 0; i < rounded; i++){
            stars.push(<img src={star} alt="star" style={{ width: "22px" }} />);
        }
        for (let i = rounded; i < 5; i++) {
            stars.push(<img src={blankStar} alt="star" style={{ width: "22px" }} />);
        }
        return stars;
      }
    

    render(){

        return (
            <React.Fragment>
                <MlbNavbar/>
                <div style={{width: "80%", margin: "auto", marginTop: "2rem"}}>
                    <div style={{}}>
                    <Form style={{marginTop: "2rem"}} onSubmit={(event) => this.handleSearchBook(event, this.state.search, this.state.searchTerm, this.state.init) & this.handleShowReview(-1)}> 
                        <Form.Group as={Row}>
                            <Col sm={5}>
                            <Form.Control type="text" placeholder="Search Term" onChange={(event) => this.setState({searchTerm: event.target.value, sortedbook: this.state.init})}/>
                            </Col>                
                            <Button style={{fontWeight: "bold", background: "#FAC917", color: "black", border: "1px solid #FAC917", opacity: "79%"}} type="submit">Search</Button>
                            <DropdownButton id="dropdown" variant="outline-secondary" title="All Categories" style={{marginLeft: "1rem"}} >
                            <Dropdown.Item eventKey='All Categories' onClick={()=>{document.getElementById("dropdown").innerHTML="All Categories"; this.setState({search: "All Categories"});}}>All Categories</Dropdown.Item>
                            <Dropdown.Item eventKey="Title" onClick={()=>{document.getElementById("dropdown").innerHTML="Title"; this.setState({search: "Title"});}}>Title</Dropdown.Item>
                            <Dropdown.Item eventKey="Author" onClick={()=>{document.getElementById("dropdown").innerHTML="Author"; this.setState({search: "Author"});}}>Author</Dropdown.Item>
                            <Dropdown.Item eventKey="ISBN" onClick={()=>{document.getElementById("dropdown").innerHTML="ISBN"; this.setState({search: "ISBN"});}}>ISBN</Dropdown.Item>
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
                                <Form.Check inline label='All' type='radio' name='genre' id='all' checked = {this.state.check === "all"} onClick = {() => {this.handleGenre("All"); this.handleShowReview(0)}}/>
                                <Form.Check inline label='Romance' type='radio' name='genre' id='romance' checked = {this.state.check === "romance"} onClick = {() => {this.handleGenre("Romance"); this.handleShowReview(0)}}/>
                                <Form.Check inline label='Horror' type='radio' name='genre' id='horror' checked = {this.state.check === "horror"} onClick={() => { this.handleGenre("Horror"); this.handleShowReview(0)}}/>
                                <Form.Check inline label='Fantasy' type='radio' name='genre' id='fantasy' checked = {this.state.check === "fantasy"} onClick={() => {this.handleGenre("Fantasy"); this.handleShowReview(0)}}/>
                                <Form.Check inline label='Adventure' type='radio' name='genre' id='adventure' checked = {this.state.check === "adventure"} onClick={() => {this.handleGenre( "Adventure"); this.handleShowReview(0)}}/>
                                <Form.Check inline label='Science' type='radio' name='genre' id='science' checked = {this.state.check === "science"} onClick={() => {this.handleGenre("Science"); this.handleShowReview(0)}}/>
                                <Form.Check inline label='Autobiography' type='radio' name='genre' id='autobiography' checked = {this.state.check === "autobiography"} onClick={() => {this.handleGenre("Autobiography"); this.handleShowReview(0)}}/>                                
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
                                    <Form.Check inline label='Price' type='radio' name='sort' id='price' onClick={() => {this.handlePrice("Price")}}/>
                                    <Form.Check inline label='Alphabet' type='radio' name='sort' id='alphabet' onClick={() => {this.handlePrice("Alphabet")}}/>
                                </Form>
                            </div>
                        </div>
                    <Table size="sm" style={{ minWidth: "1000px", margin: "auto", marginTop:"1.5rem"}}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Seller</th>
                                <th>Avg. Rating</th>
                                <th>Highest Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.books.map((book) => 
                            <tr style={this.state.shownReviews.includes(-1) ? {} : { display: "none"}}>                            
                                <td>
                                    <Link className="nav-link" to={`${this.props.match.url}/${book._id}`} style={{paddingLeft: 0, paddingRight: 0}}>
                                        {book.title}
                                    </Link>                           
                                </td>                                
                                <td><Link href="#">{book.author}</Link></td>
                                <td>{book.genre}</td>
                                <td>
                                    <Link className="nav-link" to={`${this.props.match.url}/${book.owner.userID}`} style={{paddingLeft: 0, paddingRight: 0}}>
                                        {book.owner.userID}
                                    </Link>
                                </td>                                                
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
