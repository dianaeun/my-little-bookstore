import React, {Component} from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';

class EditBookModal extends Component{
    constructor(props){
        super(props);
        this.titleRef = React.createRef();
        this.authorRef = React.createRef();
        this.publisherRef = React.createRef();
        this.priceRef = React.createRef();
    }
    handleSubmit = event => {
        event.preventDefault();
        console.log("handleSubmit owner..?", this.props.owner);
        const title = this.titleRef.current.value;
        const author = this.authorRef.current.value;
        const publisher = this.publisherRef.current.value;
        const price = this.priceRef.current.value;
        const date = new Date();
        if (title.trim().length === 0 || author.trim().length === 0 || publisher.trim().length === 0 || price.trim().length === 0){
          console.log("warning modal (null type input)");
          return;
        }
        const requestBody = {
          query: `
                mutation EditBook($bookID: ID!, $title: String!, $author: String!, $publisher: String!, $price: Float!, $date: String!, $owner: ID!, $rating: Int!, $genre: String!, $isbn: String!){
                    editBook(bookID: $bookID, bookInput: {title: $title, author: $author, publisher: $publisher, price: $price, date: $date, owner: $owner, rating: $rating, genre: $genre, isbn: $isbn}) {
                        _id
                    }
                }
            `,
            variables: {
                title: title,
                author: author,
                publisher: publisher,
                price: parseFloat(price),
                date: date,
                owner: this.props.owner,
                rating: 0,
                genre: "",
                isbn: ""
            }
        };
        fetch("/graphql", {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
        .then(res => {
          console.log(res.status);
          if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed to fetch during edit book!!!!');
          }
          return res.json();
        })
        .then(resData => {
          console.log("successful edited your book!", resData);
          this.setState({createdAccount: true});
        })
        .catch(err =>{
          console.log(err);
          //throw err;    => user 가 이미 존재할때 그냥 error 을 throw 시켜버릴때 먹통이된다! 
        });
        this.setState({rawBookInfo: [], bookInfo: []});
        alert("you have successfully edited a book!");
        this.props.handleClose();
    }
    render(){
        return(
            <Modal
                show={this.props.show}
                onHide={this.props.handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header style={{background: "#348093"}}closeButton>
                    <Modal.Title style={{color: "white"}}>Edit Books</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    
                        <Form>
                                    <Form.Group as={Row} controlId="TitleInput">
                                        <Form.Label column sm={3}>
                                            Title
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" defaultValue={this.props.book.title} ref={this.titleRef}/>
                                        </Col>
                                    </Form.Group>
                              
                                    <Form.Group as={Row} controlId="AuthorInput">
                                        <Form.Label column sm={3}>
                                            Author
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" defaultValue={this.props.book.author} ref={this.authorRef}/>
                                        </Col>
                                    </Form.Group>
                                    
                                    <Form.Group as={Row} controlId="PublisherInput">
                                        <Form.Label column sm={3}>
                                            Publisher
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" defaultValue={this.props.book.publisher} ref={this.publisherRef}/>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="PriceInput">
                                        <Form.Label column sm={3}>
                                            Price ($)
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="number" defaultValue={this.props.book.price} ref={this.priceRef}/>
                                        </Col>
                                    </Form.Group>
                                    </Form>
                        
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}> Close </Button>
                    <Button variant="success" onClick={(event) => this.handleSubmit(event)}> Save </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default EditBookModal;