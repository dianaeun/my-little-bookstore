import React, {Component} from 'react';
import {Modal, Button, ButtonGroup, ToggleButton, Form, Card, Row, Col} from 'react-bootstrap';
import request from 'superagent';

class AddBookModal extends Component{
    state = {
        radioValue : '1',
        searchField: '',
        rawBookInfo: [],
        bookInfo: []
    };
    constructor(props){
        super(props);
        this.titleRef = React.createRef();
        this.authorRef = React.createRef();
        this.publisherRef = React.createRef();
        this.priceRef = React.createRef();
        this.bookFile = null;
      }
    setRadioValue = (n) => {
        this.setState({radioValue: n})
    };

    setSearchField = (val) => {
        this.setState({searchField: val})
    };

    searchISBN = (e) => {
        e.preventDefault();
        // for specific isbn search, use https://www.googleapis.com/books/v1/volumes?q=isbn:ISBN number
        const term = this.state.searchField;
        if (term.trim().length !== 13 || isNaN(term)){
            alert("please provide ISBN13");
            return;
        }

        request
        .get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + this.state.searchField)
        .then((data) => {
            const cleanData = this.cleanData(data)
            this.setState({rawBookInfo: cleanData})
        })

        this.state.bookInfo.length = 0
        
        for (const [i, book] of this.state.rawBookInfo.entries()) {
            this.state.bookInfo.push(
                <Card key={i}>
                    <Card.Img variant="top" src={book.volumeInfo.imageLinks.thumbnail}/>
                    <Card.Body>
                        <Card.Title>{book.volumeInfo.title}</Card.Title>
                        <Card.Subtitle>{book.volumeInfo.authors}</Card.Subtitle>
                        <Card.Text>
                        Published Date: {book.volumeInfo.publishedDate}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
            this.titleRef.current.value = book.volumeInfo.title;
            this.authorRef.current.value = book.volumeInfo.authors;
            this.publisherRef.current.value = book.volumeInfo.publisher;
        }
            
    }

    cleanData = (data) => {
        const cleanData = data.body.items.map((book) => {
            if(book.volumeInfo.hasOwnProperty('publishedDate') === false) {
                book.volumeInfo['publishedDate'] = '0000';
            }
            if(book.volumeInfo.hasOwnProperty('imageLinks') === false) {
                book.volumeInfo['imageLinks'] = {thumbnail: ''};
            }

            return book;
        })
        return cleanData;
    }
    
    handleFileSelected = (e) => {
        e.preventDefault();
        this.bookFile = e.target.files[0];
        //console.log(this.bookFile);
    }

    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    };

    
    radios = [
      { name: 'Search By ISBN', value: '1' },
      { name: 'Manual Entry', value: '2' },
      { name: 'Upload E-Book', value: '3' },
    ];

    handleSubmit = async event => {
        event.preventDefault();
        if (this.state.radioValue === '3') {
            // Handling Upload E-book case
            console.log("this is Ebook case!!");
            if (this.bookFile == null) {
                alert("Please choose a file");
                return
            }
            const fileName = this.bookFile.name;
            const base64String = await this.convertBase64(this.bookFile);
            //console.log(base64String);
            const date = new Date();
            const requestBody = {
                query: `
                        mutation CreateEBook($title: String!, $file: String!, $date: String!, $owner: ID!){
                            createEBook(eBookInput: {title: $title, file: $file, date: $date, owner: $owner}) {
                                _id
                            }
                        }
                    `,
                    variables: {
                        title: fileName,
                        file: base64String,
                        date: date,
                        owner: this.props.owner
                    }
                };
                fetch("/graphql", {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
                .then(res => {
                    console.log(res.status);
                    if (res.status !== 200 && res.status !== 201) {
                        throw new Error('Failed to create E-book!');
                    }
                    return res.json();
                })
                .then(resData => {
                    if (resData.data.creatEBook){
                        console.log("successfully added your E-book!", resData);
                    }
                })
                .catch(err =>{
                    console.log(err);
                });
                alert("you have successfully added an E-book!");
        }
        else {
            // Handling Add Book case
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
                    mutation CreateBook($title: String!, $author: String!, $publisher: String!, $price: Float!, $date: String!, $owner: ID!, $genre: String!, $isbn: String!){
                        createBook(bookInput: {title: $title, author: $author, publisher: $publisher, price: $price, date: $date, owner: $owner, genre: $genre, isbn: $isbn}) {
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
                    genre: "",
                    isbn: ""
                }
            };
            fetch("/graphql", {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
            .then(res => {
                console.log(res.status);
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed to create book!');
                }
                return res.json();
            })
            .then(resData => {
                if (resData.data.createBook){
                    //console.log("successful added your book!", resData);
                }
            
            })
            .catch(err =>{
                console.log(err);
            });
            this.setState({rawBookInfo: [], bookInfo: []});
            alert("you have successfully added a book!");
        }
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
                <Modal.Header closeButton style={{background: "#348093"}}>
                    <Modal.Title style={{color: "white"}}>Add Books</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Card>
                        <Card.Header>
                            <ButtonGroup toggle>
                                {this.radios.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        type="radio"
                                        style={{background: this.state.radioValue === radio.value ? "#22525F" : '#666666'
                                                ,color: this.state.radioValue === radio.value ? '#FAC917' : '#ffffff'}}
                                        // variant= {this.state.radioValue === radio.value ? 'primary' : 'secondary'}
                                        name="radio"
                                        value={radio.value}
                                        checked={this.state.radioValue === radio.value}
                                        onChange={(e) => this.setRadioValue(e.currentTarget.value)}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </Card.Header>
                        <Card.Body>
                            {this.state.radioValue === '1' &&
                                <Form>
                                    <Form.Group as={Row} controlId="ISBNInput">
                                        <Form.Label column sm={2}>
                                            ISBN
                                        </Form.Label>
                                        <Col sm={7}>
                                            <Form.Control type="text" placeholder="Enter the ISBN13 to Search" onChange = {(e) => this.setSearchField(e.target.value)}/>
                                        </Col>
                                        <Col sm={2}>
                                            <Button type="submit" onClick={(e) => this.searchISBN(e)}>Search</Button>
                                        </Col>
                                    </Form.Group>

                                    <Row>
                                        <Col> Result </Col>
                                    </Row>
                                    <Row>
                                        {this.state.bookInfo}
                                    </Row>

                                    <Form.Group as={Row} controlId="TitleInput">
                                        <Form.Label column sm={3}>
                                            Title
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder="Title" ref={this.titleRef}/>
                                        </Col>
                                    </Form.Group>
                              
                                    <Form.Group as={Row} controlId="AuthorInput">
                                        <Form.Label column sm={3}>
                                            Author
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder="Author" ref={this.authorRef}/>
                                        </Col>
                                    </Form.Group>
                                    
                                    <Form.Group as={Row} controlId="PublisherInput">
                                        <Form.Label column sm={3}>
                                            Publisher
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder="Publisher" ref={this.publisherRef}/>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="PriceInput">
                                        <Form.Label column sm={3}>
                                            Price ($)
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="number" placeholder="0.00" ref={this.priceRef}/>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            }
                            {this.state.radioValue === '2' &&
                                <Form>
                                    <Form.Group as={Row} controlId="TitleInput">
                                        <Form.Label column sm={3}>
                                            Title
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder="Title" ref={this.titleRef}/>
                                        </Col>
                                    </Form.Group>
                              
                                    <Form.Group as={Row} controlId="AuthorInput">
                                        <Form.Label column sm={3}>
                                            Author
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder="Author" ref={this.authorRef}/>
                                        </Col>
                                    </Form.Group>
                                    
                                    <Form.Group as={Row} controlId="PublisherInput">
                                        <Form.Label column sm={3}>
                                            Publisher
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder="Publisher" ref={this.publisherRef}/>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="PriceInput">
                                        <Form.Label column sm={3}>
                                            Price ($)
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="number" placeholder="0.00" ref={this.priceRef}/>
                                        </Col>
                                    </Form.Group>
                              </Form>
                            }
                            {this.state.radioValue === '3' && 
                                <Form>
                                    <Form.Group>
                                    <Form.File onChange={(e) => this.handleFileSelected(e)} id="FormControlFile" label="The E-Book must be copyright free" />
                                    </Form.Group>
                                </Form>
                            }
                        </Card.Body> 
                    </Card>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}> Close </Button>
                    <Button variant="success" onClick={(event) => this.handleSubmit(event)}> Save </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddBookModal;