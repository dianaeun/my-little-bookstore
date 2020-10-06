import React, { Component } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import AddDiscussion from "../components/AddDiscussion";
import MlbNavbar from '../components/NavigationBar.js'


const thumbsup = require("../icons/thumbs-up.png");
const comment = require("../icons/comment.png");
const tag = require("../icons/tag.png");

class Discussion extends Component {
  state = {
    shown: [],
    addDiscussion: false
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
          {/* <Card
            style={{width: "60%", marginLeft: "20%", marginTop: "3%", background: "#CEE4E9"}}
          >
            <Card.Body>
              <Card.Title>Hyeon Joon Lee</Card.Title>
              <Button
                variant="primary"
                style={{width: "50%", marginLeft: "25%", fontFamily: "fantasy", background: "#2E7384", border: 0, padding: "0.7rem"}}
                onClick={this.handleAddDiscussion}
              >
                Start Your Discussion
              </Button>
            </Card.Body>
          </Card> */}
          <div style={{ width: "60%", marginLeft: "20%", marginTop: "2rem" }}>
            <div style={{display: "flex"}}>
              <h2>Discussions</h2>
              <Button
                style={{ marginLeft: "2rem", background: "#2E7384", border: 0, }}
                onClick={this.handleAddDiscussion}
              >Add Discussion</Button>
            </div>
            
            <Form style={{marginTop: "2rem"}}> 
              <Form.Group as={Row}>
                <Col sm={5}>
                  <Form.Control type="text" placeholder="Search Term" />
                </Col>
                <Button variant="outline-primary">Search</Button>
              </Form.Group>
            </Form>
            <hr
              style={{color: "black", backgroundColor: "black", height: "0.1rem", margin: 0}}
            />
            <Form>
              <div key={`inline-radio`} style={{textAlign: "right"}}>
                  <Form.Label column sm="3">Sort By</Form.Label>
                  <Form.Check inline label='Rating' type='radio' id='rating' />
                  <Form.Check inline label='Price' type='radio' id='price' />
                  <Form.Check inline label='Alphabet' type='radio' id='alphabet' />
              </div>
            </Form>
          </div>
          {this.discussions.map((discussion, i) => (
            <Card
              style={{width: "60%", marginLeft: "20%", marginTop: "1rem", background: "#CEE4E9"}}
            >
              <Card.Body>
                <Card.Title style={{ display: "flex" }}>
                  <div style={{ display: "flex", minWidth: "100%", fontSize: "80%" }}>
                    {discussion.name}
                    <div
                      style={{ width: "50%", marginLeft: "5%"}}
                    >
                      {discussion.date}
                      <img
                        src={tag}
                        alt="tag"
                        style={{width: "1.4rem", height: "1.4rem", marginLeft: "10%"}}
                      />
                      {discussion.book}
                    </div>
                  </div>
                </Card.Title>
                <Card.Text style={{ marginLeft: "3%" }}>
                  <p style={{ fontStyle: "italic", fontSize: "1.3rem"}}>
                      {discussion.title}                
                      <Button
                          id={"button" + i}
                          variant="outline-primary"
                          onClick={(event) => this.handleShow(event.target.id.slice(6))}
                          style={{paddingTop: 0, paddingBottom: 0, marginLeft: "0.6rem", marginBottom: "0.2rem"}}
                      >
                          {this.state.shown.includes(i + "") ? "hide" : "show"}
                      </Button>
                  </p>
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
