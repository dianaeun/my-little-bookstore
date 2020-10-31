import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import {Form, Dropdown, DropdownButton, Row, Col, Button} from 'react-bootstrap';
import MlbNavbar from '../components/NavigationBar.js'

const star = require("../icons/star.png");
const blankStar = require("../icons/blank_star.png");

class Browse extends Component{
    searchBook = (val) => {
        // do the actual searching
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
        var genres = ['Romance', 'Horror', 'Fantasy', 'Adventure', 'Science']

        // dummy data for book information
        var book1 = ['Introduction To Java Programming', 'Y. Daniel Liang', 5, 3.50]
        var book2 = ['The Three Little Pigs', 'Authur Lee', 5, 5.5]
        var book3 = ['Cinderella', 'Alex Khun', 4, 7.0]
        var book4 = ['Alice in Wonderland', 'Carroll', 2, 4.0]
        var books = [book1, book2, book3, book4]

        const items = []

        // books.map((book) => {
        //     items.push(<tr><td><Link href="#">{book[0]}</Link></td>
        //                    <td><Link href="#">{book[1]}</Link></td>
        //                    {this.createStar(book[2])}
        //                    <td>$ {book[3]}</td></tr>)
        // })
        for (const [i, value] of books.entries()) {
          items.push(<tr key={i}><td><Link href="#">{value[0]}</Link></td>
                    <td><Link href="#">{value[1]}</Link></td>
                    {this.createStar(value[2])}
                    <td>$ {value[3]}</td></tr>)
        }
        

        return (
            <React.Fragment>
                <MlbNavbar/>
                <div style={{width: "80%", margin: "auto", marginTop: "2rem"}}>
                    <div style={{}}>
                        <Form style={{marginTop: "1rem"}}> 
                        <Form.Group as={Row}>
                            <Col sm={5}>
                            <Form.Control type="text" placeholder="Search Term" />
                            </Col>
                            <Button style={{fontWeight: "bold", background: "#FAC917", color: "black", border: "1px solid #FAC917", opacity: "79%"}}>Search</Button>
                            <DropdownButton variant="outline-secondary" title="All Categories" style={{marginLeft: "1rem"}} >
                            <Dropdown.Item eventKey='All Categories'>All Categories</Dropdown.Item>
                            <Dropdown.Item eventKey="Title">Title</Dropdown.Item>
                            <Dropdown.Item eventKey="Author">Author</Dropdown.Item>
                            <Dropdown.Item eventKey="ISBN">ISBN</Dropdown.Item>
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
                                    <Form.Check style={{margin: "0.3rem"}} inline label='Rating' name='sort' type='radio' id='rating' />
                                    <Form.Check style={{margin: "0.3rem"}} inline label='Price' name='sort' type='radio' id='price' />
                                    <Form.Check style={{margin: "0.3rem"}} inline label='Alphabet' name='sort' type='radio' id='alphabet' />
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
                            {items}
                        </tbody>
                    </Table>
                </div>
            </React.Fragment>
        )
    }
}

export default Browse;
