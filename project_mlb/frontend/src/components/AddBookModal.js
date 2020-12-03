import React, {Component} from 'react';
import {Modal, Button, ButtonGroup, ToggleButton, Form, Card, Row, Col} from 'react-bootstrap';
import request from 'superagent';
import { validateISBN } from '../functions/InputValidations.js';

class AddBookModal extends Component{
    state = {
        radioValue : '1',
        searchField: '',
        rawBookInfo: [],
        isbn: "",
        genres: []
    };
    constructor(props){
        super(props);
        this.bookInfo = [];
        this.titleRef = React.createRef();
        this.authorRef = React.createRef();
        this.publisherRef = React.createRef();
        this.priceRef = React.createRef();
        this.bookFile = null;
    }
    handleCheckBoxes = target => {
        this.setState(prevState => {
            let genres = [...prevState.genres];
            console.log("prevGenres:", genres);
            if (genres.indexOf(target) === -1) {
                genres.push(target);
            }
            else {
                genres.splice(genres.indexOf(target), 1);
            }
            return {genres: genres}
        });
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
        if (!validateISBN(term)){
            alert("please provide Correct Form of ISBN13");
            return;
        }
        this.setState({isbn: term});
        request
        .get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + term)
        .then((data) => {
            const cleanData = this.cleanData(data)
            this.setState({rawBookInfo: [cleanData[0]]})
            console.log(cleanData)
        })
    }

    cleanData = (data) => {
        const cleanData = data.body.items.map((book) => {
            if(book.volumeInfo.hasOwnProperty('publishedDate') === false) {
                book.volumeInfo['publishedDate'] = '0000';
            }
            if(book.volumeInfo.hasOwnProperty('imageLinks') === false) {
                book.volumeInfo['imageLinks'] = {thumbnail: ''};
            }
            if(book.volumeInfo.hasOwnProperty('authors') === false) {
                book.volumeInfo['authors'] = 'unknown';
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

    handleAddBookClose = () => {
        this.setState({rawBookInfo: []});
        this.props.handleClose();
    }

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
            var genre = this.state.genres.length !== 0 ? this.state.genres.join(",") : "";
            var image = "";
            var isbn = "";
            var description = "";
            if (this.state.radioValue === '1') {
                const book = this.state.rawBookInfo[0].volumeInfo;
                genre = book.categories ? book.categories.join(",") : "";
                image = book.imageLinks.thumbnail;
                isbn = this.state.isbn;
                description = book.description;
            }
            if (title.trim().length === 0 || author.trim().length === 0 || publisher.trim().length === 0 || price.trim().length === 0){
                console.log("warning modal (null type input)");
                return;
            }
            const requestBody = {
            query: `
                    mutation CreateBook($title: String!, $author: String!, $publisher: String!, $price: Float!, $date: String!, $owner: ID!, $genre: String!, $image: String!, $isbn: String!, $description: String!){
                        createBook(bookInput: {title: $title, author: $author, publisher: $publisher, price: $price, date: $date, owner: $owner, genre: $genre, image: $image, isbn: $isbn, description: $description}) {
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
                    genre: genre,
                    image: image,
                    isbn: isbn,
                    description: description
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
                                    
                                    {this.state.rawBookInfo.map((book) =>(
                                    <div>
                                    <Row style={{marginLeft: "20%"}}>
                                        <Card>
                                            <Card.Img variant="top" src={book.volumeInfo.imageLinks.smallThumbnail}/>
                                            <Card.Body>
                                                <Card.Title>{book.volumeInfo.title}</Card.Title>
                                                <Card.Subtitle>{book.volumeInfo.authors}</Card.Subtitle>
                                                <Card.Text>
                                                Published Date: {book.volumeInfo.publishedDate}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        </Row>
                                    <Form.Group as={Row} controlId="TitleInput">
                                        <Form.Label column sm={3}>
                                            Title
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control id="title" type="text" value={book.volumeInfo.title} ref={this.titleRef}/>
                                        </Col>
                                    </Form.Group>
                              
                                    <Form.Group as={Row} controlId="AuthorInput">
                                        <Form.Label column sm={3}>
                                            Author
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control id="author" type="text" value={book.volumeInfo.authors} ref={this.authorRef}/>
                                        </Col>
                                    </Form.Group>
                                    
                                    <Form.Group as={Row} controlId="PublisherInput">
                                        <Form.Label column sm={3}>
                                            Publisher
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control id="publisher" type="text" value={book.volumeInfo.publisher} ref={this.publisherRef} />
                                        </Col>
                                    </Form.Group>

                                    

                                    <Form.Group as={Row} controlId="PriceInput">
                                        <Form.Label column sm={3}>
                                            Price ($)
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="number" placeholder="0.00" ref={this.priceRef}/>
                                        </Col>
                                    </Form.Group></div>
                                    ))}
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

                                    
                                    <Form.Group controlId="formBasicGenre" as={Row}>
                                        <Form.Label column sm={3}>
                                            Genres
                                        </Form.Label>
                                        <Col key={`inline-checkbox`} className="mb-3">
                                            <Form.Check
                                                inline
                                                label="Romance"
                                                id={`inline-checkbox-1`}
                                                onChange={() => this.handleCheckBoxes("Romance")}
                                            />
                                            <Form.Check
                                                inline
                                                label="Horror"
                                                id={`inline-checkbox-2`}
                                                onChange={() => this.handleCheckBoxes("Horror")}
                                            />
                                            <Form.Check
                                                inline
                                                label="Fantasy"
                                                id={`inline-checkbox-3`}
                                                onChange={() => this.handleCheckBoxes("Fantasy")}
                                            />
                                            <Form.Check
                                                inline
                                                label="Adventure"
                                                id={`inline-checkbox-4`}
                                                onChange={() => this.handleCheckBoxes("Adventure")}
                                            />
                                            <Form.Check
                                                inline
                                                label="Science"
                                                id={`inline-checkbox-5`}
                                                onChange={() => this.handleCheckBoxes("Science")}
                                            />
                                            <Form.Check
                                                inline
                                                label="Autobiography"
                                                id={`inline-checkbox-6`}
                                                onClick={() => this.handleCheckBoxes("Autobiography")}
                                            />
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
                    <Button variant="secondary" onClick={()=>this.handleAddBookClose()}> Close </Button>
                    <Button variant="success" onClick={(event) => this.handleSubmit(event)}> Save </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddBookModal;