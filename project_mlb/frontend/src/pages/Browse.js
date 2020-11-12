import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import {Form, Dropdown, DropdownButton, Row, Col, Button} from 'react-bootstrap';
import MlbNavbar from '../components/NavigationBar.js'
import AuthContext from '../context/AuthContext';

const star = require("../icons/star.png");
const blankStar = require("../icons/blank_star.png");

class Browse extends Component{
    state = { 
        books:[], 
        genres: [],
        searchBook : false,
        isLoadingBook: false,
        search : "",
        searchTerm : "",
        sort : "All",
        liked : [],
        sortedbook : [],
        sortbyradio : []
        
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
                        rating
                        genre
                        price
                    }
                }
            `
        }
        fetch('http://localhost:8000/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed to fetch books!")
            }
            return res.json()
        })
        .then(resData => {
            console.log("Books are successfully fetched! ", resData);
            const books = resData.data.books;
            if(this.state.sort === "price")
                books.sort((a, b) => b.price - a.price);

            else if(this.state.sort === "Alphabet")
                books.sort((a,b) => a.title.localeCompare(b.title));
            else;
            // let selectedBooks = books.slice(0,10);
            // console.log(selectedBooks);
            this.setState({books: books, sortedbook: books} );
        })
        .catch(err => { console.log(err);});
    };

      handleSearchBook = (event, search, searchTerm) => {
        event.preventDefault();
        let books = this.state.books;
        if (search === "Title")
          books = this.state.sortedbook.filter(function(book){return book.title.toLowerCase().includes(searchTerm.toLowerCase())});
        // else if (search === "ISBN")
        //   books = this.state.sortedbook.filter(function(book){return book.isbn.toLowerCase().includes(searchTerm.toLowerCase())});
        //book.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        else if (search === "Author")
          books = this.state.sortedbook.filter(function(book){return book.author.toLowerCase().includes(searchTerm.toLowerCase())});
        else 
          books = this.state.sortedbook.filter(function(book){
            return  book.title.toLowerCase().includes(searchTerm.toLowerCase())
             || book.author.toLowerCase().includes(searchTerm.toLowerCase())});
        this.setState({books: books});
      }

    // searchBook = (val) => {
    //     // do the actual searching
    // }

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
        var genres = ['Romance', 'Horror', 'Fantasy', 'Adventure', 'Science']

        // dummy data for book information
        // var book1 = ['Introduction To Java Programming', 'Y. Daniel Liang', 5, 3.50]
        // var book2 = ['The Three Little Pigs', 'Authur Lee', 5, 5.5]
        // var book3 = ['Cinderella', 'Alex Khun', 4, 7.0]
        // var book4 = ['Alice in Wonderland', 'Carroll', 2, 4.0]
        // var bookss = [book1, book2, book3, book4]

        // const items = []

        // bookss.map((book) => {
        //     items.push(<tr><td><Link href="#">{book[0]}</Link></td>
        //                    <td><Link href="#">{book[1]}</Link></td>
        //                    {this.createStar(book[2])}
        //                    <td>$ {book[3]}</td></tr>)
        // })
        // for (const [i, value] of bookss.entries()) {
        //   items.push(<tr key={i}><td><Link href="#">{value[0]}</Link></td>
        //             <td><Link href="#">{value[1]}</Link></td>
        //             {this.createStar(value[2])}
        //             <td>$ {value[3]}</td></tr>)
        // }
        

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
                            <Dropdown.Item eventKey="Title" onClick={()=>{document.getElementById("dropdown").innerHTML="Title"; this.setState({search: "Title"});}}>Title</Dropdown.Item>
                            <Dropdown.Item eventKey="Author" onClick={()=>{document.getElementById("dropdown").innerHTML="Author"; this.setState({search: "Author"});}}>Author</Dropdown.Item>
                            {/* <Dropdown.Item eventKey="ISBN" onClick={()=>{document.getElementById("dropdown").innerHTML="ISBN"; this.setState({search: "ISBN"});}}>ISBN</Dropdown.Item> */}
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
                                {genres.map((gen) => (
                                    <Form.Check inline label={gen} type='checkbox' id={gen} />
                                ))}
                                </td>
                            </tr>
                            <tr>
                                <td><Form.Label>Location Level</Form.Label></td>
                                {/* <td><Form.Control type="range" step="1" min="0" max="4" list="level"/></td>
                                <datalist id="level">
                                    <option value="0" label="Dong"></option>
                                    <option value="1" label="Gu"></option>
                                    <option value="2" label="City"></option>
                                    <option value="3" label="Country"></option>
                                    <option value="4" label="All"></option>
                                </datalist> */}
                                <td>
                                    <Form.Check inline label='Dong' name='level' type='radio' id='Dong' />
                                    <Form.Check inline label='Gu' name='level' type='radio' id='Gu' />
                                    <Form.Check inline label='City' name='level' type='radio' id='City' />
                                    <Form.Check inline label='State' name='level' type='radio' id='State' />
                                    <Form.Check inline label='Whole' name='level' type='radio' id='Whole' />
                                    {/* <Form.Check inline label='Near Me' type='checkbox' id='nearme' />    */}
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
                                    {/* <Form.Check style={{margin: "0.3rem"}} inline label='Rating' name='sort' type='radio' id='rating' /> */}
                                    <Form.Check inline label='Price' type='radio' name='sort' id='price' onClick={() => {this.setState({sort: "price", sortbyradio: []}); this.fetchBooks();}}/>
                                    <Form.Check inline label='Alphabet' type='radio' name='sort' id='alphabet' onClick={() => {this.setState({sort: "Alphabet", sortbyradio: []}); this.fetchBooks();}}/>
                                </Form>
                            </div>
                        </div>
                    <Table size="sm" style={{ minWidth: "1000px", margin: "auto", marginTop:"1.5rem"}}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Avg. Rating</th>
                                <th>Lowest Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {items} */}
                            {this.state.books.map((book,i) => 
                              <tr>                            
                              <td><Link href="#">{book.title}</Link></td>
                              <td><Link href="#">{book.author}</Link></td>                                                      
                              <td style={{width:"10rem"}}>
                                {this.createStar(book.rating)}
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
