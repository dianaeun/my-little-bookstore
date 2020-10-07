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


        for (const [_index, value] of books.entries()) {
          items.push(<tr><td><Link href="#">{value[0]}</Link></td>
                    <td><Link href="#">{value[1]}</Link></td>
                    {this.createStar(value[2])}
                    <td>$ {value[3]}</td></tr>)
        }
        

        return (
            <React.Fragment>
                <MlbNavbar/>
                <div style={{width: "80%", margin: "auto"}}>
                    <div style={{}}>
                        <Form style={{marginTop: "1rem"}}> 
                        <Form.Group as={Row}>
                            <Col sm={5}>
                            <Form.Control type="text" placeholder="Search Term" />
                            </Col>
                            <Button>Search</Button>
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
                            <Form.Row>
                                <Col className="mb-3">
                                <Form.Label column sm="1">Genre</Form.Label>
                                {genres.map((gen) => (
                                    <Form.Check inline label={gen} type='checkbox' id={gen} />
                                ))}
                                </Col>
                            </Form.Row>
                            <Form.Row>
                            <Col className="mb-3">
                                <Form.Label column sm="1">Location</Form.Label>
                                <Form.Check inline label='Near Me' type='checkbox' id='nearme' />
                                </Col>
                            </Form.Row>
                        </Form>
                    </div>
                    {/* <hr
                        style={{color: "black", backgroundColor: "black", height: "0.1rem", margin: "0.1rem"}}
                        />
                    
                        <br></br> */}
                        <h3 style={{textAlign: "center"}}>Search Results</h3>
                        <div key={`inline-radio`} className="mb-3">
                            <Form style={{border:"solid grey", width:"27%", borderRadius:"0.2rem", float:"right", margin:"0.3rem", fontSize: "0.85rem"}}>
                                <Form.Label column sm="3">Sort By</Form.Label>
                                <Form.Check inline label='Rating' name='sort' type='radio' id='rating' />
                                <Form.Check inline label='Price' name='sort' type='radio' id='price' />
                                <Form.Check inline label='Alphabet' name='sort' type='radio' id='alphabet' />
                            </Form>
                        </div>
                    
                    <Table size="sm" style={{ minWidth: "1000px", margin: "auto"}}>
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
