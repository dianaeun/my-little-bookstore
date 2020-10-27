import React, { Component } from "react";
import { Card, Button, Form, Row, Col, DropdownButton, Dropdown} from "react-bootstrap";
import AddDiscussion from "../components/AddDiscussion";
import MlbNavbar from '../components/NavigationBar.js'

const thumbsup = require("../icons/thumbs-up.png");
const comment = require("../icons/comment.png");
const tag = require("../icons/tag.png");

class Comment {
  constructor (author, content) {
    this.author = author;
    this.content = content;
    let date = new Date();
    this.date = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
  }
}

class Discussion extends Component {
  state = {
    shownDiscussions: [],
    shownComments: [],
    liked: [],
    addDiscussionModal: false,
    newDiscussion: {},
    discussions: [
      {
        name: "Hyeon Joon Lee",
        title: "What is your favorite phrase in “12 Rules for Life”?",
        book: "12 Rules for Life",
        likes: 23,
        comments: [new Comment("DongHun Kim", "What is the book about?"), new Comment("Daye Eun", "I'd like to read it one day."), new Comment("JongSun Park", '"When you have something to say, silence is a lie."')],
        content: "I was just wondering..",
        date: "2020/09/05",
      },
      {
        name: "DongHun Kim",
        title: "What is the biggest difference between “The Da vinci Code” the movie and the novel?",
        book: "The Da Vinci Code",
        likes: 15,
        comments: [],
        content: "I liked the book much more than the movie.",
        date: "2020/09/23",
      },
    ]
  };
  handleDiscussionSort = (sortBy) => {
    let discussions = this.state.discussions;
    if (sortBy === "Likes")
      discussions.sort(function(a, b){return b.likes - a.likes});
    else if (sortBy === "Comments")
      discussions.sort(function(a, b){return b.comments.length - a.comments.length});
    else discussions.sort(function(a, b){return Date.parse(b.date) - Date.parse(a.date)});
    this.setState({discussions: discussions});
  }
  handleShowDiscussion = (target) => {
    let index = this.state.shownDiscussions.indexOf(target);
    if (index === -1) {
      this.state.shownDiscussions.push(target);
    } else this.state.shownDiscussions.splice(index, 1);
    this.setState({ shownDiscussions: this.state.shownDiscussions });
  };
  handleShowComments = (target) => {
    let index = this.state.shownComments.indexOf(target);
    if (index === -1) {
      this.state.shownComments.push(target);
    } else this.state.shownComments.splice(index, 1);
    this.setState({ shownComments: this.state.shownComments });
  };
  handleLike = (target) => {
    let index = this.state.liked.indexOf(target);
    let discussions = this.state.discussions;
    if (index === -1) {
      discussions[target].likes = discussions[target].likes + 1;
      this.state.liked.push(target);
    } else {
      discussions[target].likes = discussions[target].likes - 1;
      this.state.liked.splice(index, 1);
    }
    this.setState({discussions: discussions});
  }
  handleClose = () => {
    this.setState({addDiscussionModal: false});
  }
  handleAddDiscussionModal = () => {
    this.setState({addDiscussionModal: true});
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let fullDate = year + '/' + month + '/' + date;
    let newDiscussion = {name: "Hyeon Joon Lee", title: "", book: "", likes: 0, comments: [], content: "", date: fullDate};
    this.setState({newDiscussion: newDiscussion});
  }
  handleAddDiscussion = (event) => {
    event.preventDefault();
    let discussions = this.state.discussions;
    if (this.state.newDiscussion.title === "" | this.state.newDiscussion.book === "" | this.state.newDiscussion.content === ""){
      alert("You have incomplete field(s)!");
    }
    else{
      discussions.push(this.state.newDiscussion);
      this.setState({discussions: discussions});
      alert("You have added a discussion!");
      this.setState({addDiscussionModal: false});      
    }
  }
  handleContentChange = (value) => {
    let newDiscussion = this.state.newDiscussion;
    newDiscussion.content = value;
    this.setState({newDiscussion: newDiscussion});
  }
  handleTitleChange = (value) => {
    let newDiscussion = this.state.newDiscussion;
    newDiscussion.title = value;
    this.setState({newDiscussion: newDiscussion});
  }
  handleTagChange = (value) => {
    let newDiscussion = this.state.newDiscussion;
    newDiscussion.book = value;
    this.setState({newDiscussion: newDiscussion});
  }
  render() {
    return (
        <div>
          <MlbNavbar/>
          <AddDiscussion show={this.state.addDiscussionModal} handleAddDiscussion={(event) => this.handleAddDiscussion(event)} handleClose={this.handleClose}
          handleContentChange={this.handleContentChange} handleTagChange={this.handleTagChange} handleTitleChange={this.handleTitleChange}/>
          <div style={{ width: "60%", marginLeft: "20%", marginTop: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center"}}>
              <h1>Discussions</h1>
              <Button variant="info"
                style={{ marginLeft: "2rem", height: "2rem"}}
                onClick={this.handleAddDiscussionModal}
              >Add Discussion</Button>
            
            </div>
            <Form style={{marginTop: "2rem"}}> 
              <Form.Group as={Row}>
                <Col sm={5}>
                  <Form.Control type="text" placeholder="Search Term" />
                </Col>
                <Button style={{fontWeight: "bold", background: "#FAC917", color: "black", border: "1px solid #FAC917", opacity: "79%"}}>Search</Button>
                <DropdownButton id="dropdown" variant="outline-secondary" title="All Categories" style={{marginLeft: "1rem"}} >
                  <Dropdown.Item eventKey='All Categories' onClick={(event)=>document.getElementById("dropdown").innerHTML=event.target.innerHTML}>All Categories</Dropdown.Item>
                  <Dropdown.Item eventKey="Tag" onClick={(event)=>document.getElementById("dropdown").innerHTML=event.target.innerHTML}>Tag</Dropdown.Item>
                  <Dropdown.Item eventKey="Title" onClick={(event)=>document.getElementById("dropdown").innerHTML=event.target.innerHTML}>Title</Dropdown.Item>
                  <Dropdown.Item eventKey="Content" onClick={(event)=>document.getElementById("dropdown").innerHTML=event.target.innerHTML}>Content</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
            </Form>
            <hr
              style={{color: "black", backgroundColor: "black", height: "0.1rem", marginTop: "3rem", marginBottom: 0}}
            />
            <div key={`inline-radio`} style={{textAlign: "right"}}>
              <Form>
                <Form.Label column sm="3" style={{marginRight: "1rem"}}>Sort By</Form.Label>
                <Form.Check inline label='Likes' type='radio' name='category' id='likes' onClick={()=>this.handleDiscussionSort("Likes")}/>
                <Form.Check inline label='Comments' type='radio' name='category' id='comments' onClick={()=>this.handleDiscussionSort("Comments")}/>
                <Form.Check inline label='Date' type='radio' name='category' id='date' onClick={()=>this.handleDiscussionSort("Date")}/>
              </Form>
            </div>
          </div>
          {this.state.discussions.map((discussion, i) => (
            <Card
              style={{width: "60%", marginLeft: "20%", marginTop: "1rem", background: "#CEE4E9"}}
            >
              <Card.Body>
                <Card.Title style={{ display: "flex" }}>
                  <Row style={{fontSize: "1.2rem", width: "100%"}}>
                    <div style={{paddingLeft: "2rem", paddingRight: "2rem"}}>
                      {discussion.name}
                    </div>
                    <div style={{paddingLeft: "2rem", paddingRight: "2rem"}}>
                      {discussion.date}
                    </div>
                    <div style={{paddingLeft: "2rem"}}>
                      <img
                        src={tag}
                        alt="tag"
                        style={{width: "1.4rem", height: "1.4rem", marginRight: "0.7rem"}}
                      />
                      {discussion.book}
                    </div>
                  </Row>
                </Card.Title>
                <Card.Text style={{ marginLeft: "3%" }}>
                  <Row style={{ fontStyle: "italic", fontWeight: "bold", fontSize: "1.4rem"}}>
                    <Col sm={10}>
                      {discussion.title}                      
                    </Col>
                    <Col>
                      <Button
                        id={"button" + i}
                        variant="info"
                        onClick={() => this.handleShowDiscussion(i+"")}
                        style={{paddingTop: 0, paddingBottom: 0, marginLeft: "0.6rem", marginBottom: "0.2rem"}}
                      >
                        {this.state.shownDiscussions.includes(i + "") ? "hide" : "show"}
                      </Button>                    
                    </Col>

                  </Row>
                  <p style={this.state.shownDiscussions.includes(i + "") ? {marginLeft: "1rem", marginTop: "1rem"} : { display: "none"}}>
                    {discussion.content}
                  </p>
                </Card.Text>
                <Row>
                <button onClick={()=> {
                  this.handleLike(i)
                  }} style={{backgroundColor: "rgba(52, 52, 52, 0)", border: "0px", marginLeft: "1rem"}}>
                  <img
                    src={thumbsup}
                    alt="thumbs up"
                    style={{ width: "1.5rem", marginRight: "0.2rem"}}
                  />
                </button>
                {discussion.likes}
                <button onClick={()=> {
                  this.handleShowComments(i+"")
                  }} style={{backgroundColor: "rgba(52, 52, 52, 0)", border: "0px", marginLeft: "1rem"}}>
                  <img
                    src={comment}
                    alt="comment"
                    style={{width: "1.5rem", marginRight: "0.2rem"}}
                  />
                </button>
                {discussion.comments.length}
                </Row>
                {discussion.comments.length > 0 && discussion.comments.map((comment)=>(
                  <Card style={this.state.shownComments.includes(i + "") ? {marginLeft: "1rem", marginTop: "1rem", background: "#EEEEEE"} : { display: "none"}}>
                    <Card.Body>
                      <Card.Title style={{ display: "flex" }}>
                        <Row style={{fontSize: "1rem", width: "100%"}}>
                          <div style={{paddingLeft: "1rem", paddingRight: "2rem", fontWeight: "bold"}}>
                            {comment.author}
                          </div>
                          <div style={{paddingLeft: "2rem", paddingRight: "2rem", fontStyle: "italic"}}>
                            {comment.date}
                          </div>
                        </Row>
                      </Card.Title>
                      <Card.Text>
                        {comment.content}
                      </Card.Text>
                    </Card.Body> 
                  </Card>                
                ))}

              </Card.Body>
            </Card>
          ))}
        </div>
    );
  }
}

export default Discussion;
