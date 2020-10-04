import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import {Form, InputGroup, FormControl, Dropdown, DropdownButton, Jumbotron, Container, Col} from 'react-bootstrap';

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
            <div>
                <Jumbotron style={{backgroundColor:'lightgray'}}>
                    <Container>
                    <InputGroup>
                        <FormControl
                        placeholder="Search Term"
                        aria-label="searchbar"
                        aria-describedby="basic-addon2"
                        />
                        <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        title="Search"
                        id="input-group-dropdown-2"
                        >
                        <Dropdown.Item href="#">Whole</Dropdown.Item>
                        <Dropdown.Item href="#">Title</Dropdown.Item>
                        <Dropdown.Item href="#">Author</Dropdown.Item>
                        <Dropdown.Item href="#">ISBN</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                    <br></br>
                    <Form>
                        <Form.Label column sm="5">Advanced Search</Form.Label>
                        <Form.Row>
                            <Col className="mb-3">
                            <Form.Label column sm="2">Genre</Form.Label>
                            {genres.map((gen) => (
                                <Form.Check inline label={gen} type='checkbox' id={gen} />
                            ))}
                            </Col>
                        </Form.Row>
                        <Form.Row>
                        <Col className="mb-3">
                            <Form.Label column sm="2">Location</Form.Label>
                            <Form.Check inline label='Near Me' type='checkbox' id='nearme' />
                            </Col>
                        </Form.Row>
                    </Form>
                    </Container>
                </Jumbotron>

                
                <Form>
                    <h5>&nbsp;&nbsp;Search Results</h5>
                    <div key={`inline-radio`} className="mb-3" style={{textAlign: "right"}}>
                        <Form.Label column sm="1">Sort By</Form.Label>
                        <Form.Check inline label='Rating' type='radio' id='rating' />
                        <Form.Check inline label='Price' type='radio' id='price' />
                        <Form.Check inline label='Alphabet' type='radio' id='alphabet' />
                    </div>
                </Form>
                <Table size="sm" style={{ width: "1000px", marginLeft: "auto", marginRight: "auto"}}>
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
        )
    }
}

export default Browse;
