import React, { Component } from "react";
import { Card, Button, Form, Row, Col, DropdownButton, Dropdown} from "react-bootstrap";
import AddDiscussion from "../components/AddDiscussion";
import MlbNavbar from '../components/NavigationBar.js'


const thumbsup = require("../icons/thumbs-up.png");
const comment = require("../icons/comment.png");
const tag = require("../icons/tag.png");

class Discussion extends Component {
  state = {
    shown: [],
    addDiscussion: false,
  };
  handleShow = (target) => {
    let index = this.state.shown.indexOf(target);
    if (index === -1) {
      this.state.shown.push(target);
    } else this.state.shown.splice(index, 1);
    this.setState({ shown: this.state.shown });
  };
  handleClose = () => {
    this.setState({addDiscussion: false});
  }
  handleAddDiscussion = () => {
    this.setState({addDiscussion: true});
  }
  discussions = [
    {
      name: "Hyeon Joon Lee",
      title: "What is your favorite phrase in “12 Rules for Life”?",
      book: "12 Rules for Life",
      likes: 23,
      comments: 10,
      content: "I was just wondering..",
      date: "2020/09/23",
    },
    {
      name: "DongHun Kim",
      title: "What is the biggest difference between “The Da vinci Code” the movie and the novel?",
      book: "The Da Vinci Code",
      likes: 15,
      comments: 5,
      content: "I liked the book much more than the movie.",
      date: "2020/09/05",
    },
  ];
  render() {
    return (
        <div>
          <MlbNavbar/>
          <AddDiscussion show={this.state.addDiscussion} handleClose={this.handleClose}/>
          <div style={{ width: "60%", marginLeft: "20%", marginTop: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center"}}>
              <h1>Discussions</h1>
              <Button variant="info"
                style={{ marginLeft: "2rem", height: "2rem"}}
                onClick={this.handleAddDiscussion}
              >Add Discussion</Button>
            
            </div>
            <Form style={{marginTop: "2rem"}}> 
              <Form.Group as={Row}>
                <Col sm={5}>
                  <Form.Control type="text" placeholder="Search Term" />
                </Col>
                <Button style={{fontWeight: "bold", background: "#FAC917", color: "black", border: "1px solid #FAC917", opacity: "79%"}}>Search</Button>
                <DropdownButton variant="outline-secondary" title="All Categories" style={{marginLeft: "1rem"}} >
                  <Dropdown.Item eventKey='All Categories'>All Categories</Dropdown.Item>
                  <Dropdown.Item eventKey="Tag">Tag</Dropdown.Item>
                  <Dropdown.Item eventKey="Title">Title</Dropdown.Item>
                  <Dropdown.Item eventKey="Content">Content</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
            </Form>
            <hr
              style={{color: "black", backgroundColor: "black", height: "0.1rem", marginTop: "3rem", marginBottom: 0}}
            />
            <Form>
              <div key={`inline-radio`} style={{textAlign: "right"}}>
                  <Form.Label column sm="3" style={{marginRight: "1rem"}}>Sort By</Form.Label>
                  <Form.Check inline label='Likes' type='radio' name='category' id='likes' checked/>
                  <Form.Check inline label='Comments' type='radio' name='category' id='comments' />
                  <Form.Check inline label='Date' type='radio' name='category' id='date' />
              </div>
            </Form>
          </div>
          {this.discussions.map((discussion, i) => (
            <Card
              style={{width: "60%", marginLeft: "20%", marginTop: "1rem", background: "#CEE4E9"}}
            >
              <Card.Body>
                <Card.Title style={{ display: "flex" }}>
                  <Row style={{fontSize: "1rem", width: "100%"}}>
                    <Col sm={3}>
                      {discussion.name}
                    </Col>
                    <Col sm={2}>
                      {discussion.date}
                    </Col>
                    <Col>
                      <img
                        src={tag}
                        alt="tag"
                        style={{width: "1.4rem", height: "1.4rem", marginLeft: "10%"}}
                      />
                      {discussion.book}
                    </Col>
                  </Row>
                </Card.Title>
                <Card.Text style={{ marginLeft: "3%" }}>
                  <Row style={{ fontStyle: "italic", fontSize: "1.3rem"}}>
                    <Col sm={10}>
                      {discussion.title}                      
                    </Col>
                    <Col>
                      <Button
                        id={"button" + i}
                        variant="info"
                        onClick={(event) => this.handleShow(event.target.id.slice(6))}
                        style={{paddingTop: 0, paddingBottom: 0, marginLeft: "0.6rem", marginBottom: "0.2rem"}}
                      >
                        {this.state.shown.includes(i + "") ? "hide" : "show"}
                      </Button>                    
                    </Col>

                  </Row>
                  <p style={this.state.shown.includes(i + "") ? {} : { display: "none" }}>
                    {discussion.content}
                  </p>
                </Card.Text>
                <img
                  src={thumbsup}
                  alt="thumbs up"
                  style={{ width: "1.5rem", marginRight: "0.2rem" }}
                />
                {discussion.likes}
                <img
                  src={comment}
                  alt="comment"
                  style={{width: "1.5rem", marginLeft: "1rem", marginRight: "0.2rem"}}
                />
                {discussion.comments}
              </Card.Body>
            </Card>
          ))}
        </div>
    );
  }
}

export default Discussion;
