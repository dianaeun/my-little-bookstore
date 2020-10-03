import React, { Component } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";

const thumbsup = require("../icons/thumbs-up.png");
const comment = require("../icons/comment.png");
const tag = require("../icons/tag.png");
class Discussion extends Component {
  state = {
    shown: [],
  };
  handleShow = (target) => {
    let index = this.state.shown.indexOf(target);
    if (index === -1) {
      this.state.shown.push(target);
    } else this.state.shown.splice(index, 1);
    this.setState({ shown: this.state.shown });
  };
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
        <Card
          style={{width: "60%", marginLeft: "20%", marginTop: "3%", background: "#CEE4E9"}}
        >
          <Card.Body>
            <Card.Title>Hyeon Joon Lee</Card.Title>
            <Button
              variant="primary"
              style={{width: "50%", marginLeft: "25%", fontFamily: "fantasy", background: "#2E7384", border: 0, padding: "10px"}}
            >
              Start Your Discussion
            </Button>
          </Card.Body>
        </Card>
        <div
          style={{marginLeft: "23%", marginTop: "30px", marginBottom: "30px" }}
        >
          <Form>
            <Form.Group as={Row}>
              <Col sm={4}>
                <Form.Control type="text" placeholder="Search by Tag" />
              </Col>
              <Button variant="outline-primary">Search</Button>
            </Form.Group>
          </Form>
        </div>
        <div style={{ width: "60%", marginLeft: "20%" }}>
          <h2>Discussions</h2>
          <hr
            style={{color: "black", backgroundColor: "black", height: "2px", margin: 0}}
          />
        </div>
        {this.discussions.map((discussion, i) => (
          <Card
            style={{width: "60%", marginLeft: "20%", marginTop: "3%", background: "#CEE4E9"}}
          >
            <Card.Body>
              <Card.Title style={{ display: "flex" }}>
                <div style={{ display: "flex", minWidth: "100%" }}>
                  {discussion.name}
                  <div
                    style={{ width: "50%", fontSize: "80%", marginLeft: "5%"}}
                  >
                    {discussion.date}
                    <img
                      src={tag}
                      alt="tag"
                      style={{width: "20px", height: "20px", marginLeft: "10%"}}
                    />
                    {discussion.book}
                  </div>
                </div>
              </Card.Title>
              <Card.Text style={{ marginLeft: "3%" }}>
                <div style={{ fontStyle: "italic", display: "flex"}}>
                    {discussion.title}                
                    <Button
                        id={"button" + i}
                        variant="outline-primary"
                        onClick={(event) => this.handleShow(event.target.id.slice(6))}
                        style={{paddingTop: "0px", paddingBottom: "0px", marginBottom: "20px", marginLeft: "10px"}}
                    >
                        {this.state.shown.includes(i + "") ? "hide" : "read"}
                    </Button>
                </div>

                <p
                  style={
                    this.state.shown.includes(i + "") ? {} : { display: "none" }
                  }
                >
                  {discussion.content}
                </p>
              </Card.Text>
              <img
                src={thumbsup}
                alt="thumbs up"
                style={{ width: "25px", marginRight: "5px" }}
              />
              {discussion.likes}
              <img
                src={comment}
                alt="comment"
                style={{width: "25px", marginLeft: "15px", marginRight: "5px"}}
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
