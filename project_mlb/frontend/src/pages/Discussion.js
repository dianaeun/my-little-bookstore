import React, { Component } from "react";
import { Card, Button, Form, Row, Col, DropdownButton, Dropdown} from "react-bootstrap";
import AddDiscussion from "../components/AddDiscussion";
import MlbNavbar from '../components/NavigationBar.js'
import AuthContext from '../context/AuthContext';

const thumbsup = require("../icons/thumbs-up.png");
const comment = require("../icons/comment.png");
const tag = require("../icons/tag.png");
let date = new Date();
date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

class Discussion extends Component {
  state = {
    searchTerm: "", searchOption: "",
    shownDiscussions: [], shownComments: [],
    liked: [],
    addDiscussionModal: false,
    newDiscussion: {},
    discussions: []
  };
  constructor(props){
    super(props);
    this.commentRef = [];
  }
  componentDidMount() {
    this.fetchDiscussions();
  }
  fetchDiscussions() {
    const requestBody = {
      query: `
          query{
              discussions{
                _id
                owner
                date
                tag
                title
                content
                likes
                comments {
                  _id
                  owner
                  date
                  content
                }
              }
          }
      `
    }
    fetch('http://localhost:8000/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed to fetch discussions!")
        }
        return res.json()
    })
    .then(resData => {
        console.log("Discussions are successfully fetched! ", resData);
        const discussions = resData.data.discussions;
        this.setState({discussions: discussions});
        for (var i=0; i < this.state.discussions.length; i++)
          this.commentRef.push(React.createRef());
    })
    .catch(err => { console.log(err);});
  }
  static contextType = AuthContext;
  handleSearch = (event, searchOption, searchTerm) => {
    event.preventDefault();
    let discussions = this.state.discussions;
    if (searchOption === "Tag")
      discussions = this.state.baseDiscussions.filter(function(discussion){return discussion.book.toLowerCase().includes(searchTerm.toLowerCase())});
    else if (searchOption === "Title")
      discussions = this.state.baseDiscussions.filter(function(discussion){return discussion.title.toLowerCase().includes(searchTerm.toLowerCase())});
    else if (searchOption === "Content")
      discussions = this.state.baseDiscussions.filter(function(discussion){return discussion.content.toLowerCase().includes(searchTerm.toLowerCase())});
    else 
      discussions = this.state.baseDiscussions.filter(function(discussion){
        return discussion.book.toLowerCase().includes(searchTerm.toLowerCase())|discussion.title.toLowerCase().includes(searchTerm.toLowerCase())
        |discussion.content.toLowerCase().includes(searchTerm.toLowerCase())});
    this.setState({discussions: discussions});
  }
  handleSearchTerm = (value) => {
    this.setState({searchTerm: value});
  }
  handleSearchOption = (value) => {
    this.setState({searchOption: value});
  }
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
    this.fetchDiscussions();
  }
  handleAddDiscussionModal = () => {
    if (this.context.userID === null){
      alert("You must login first!");
      return;
    }  
    this.setState({addDiscussionModal: true});
  }
  handleAddComment = (event, i) => {
    event.preventDefault();
    const comment = this.commentRef[i].current.value;
    if (this.context.userID === null) {
      alert("Please login to add a comment!");
      return;
    }
    if (comment.trim().length === 0){
      console.log("warning form control (null type input)");
      alert("Please fill in the field!");
      return;
    }
    const requestBody = {
        query: `
              mutation CreateComment($owner: String!, $discussion: ID!, $content: String!, $date: String!){
                createComment(commentInput: {owner: $owner, discussion: $discussion, content: $content, date: $date}){
                  _id
                }
              }
        `,
        variables: {
            owner: this.context.userID,
            date: new Date(),
            discussion: this.state.discussions[i]._id,
            content: comment
        }
    };
    fetch("http://localhost:8000/graphql", {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
    .then(res => {
        console.log(res.status);
        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed to fetch during add comment!!!!');
        }
        return res.json();
    })
    .then(resData => {
        console.log("successful added your comment!", resData);
    })
    .catch(err =>{
        console.log(err);
        //throw err;    => user 가 이미 존재할때 그냥 error 을 throw 시켜버릴때 먹통이된다! 
    });
    alert("You have successfully added a comment!");
    this.fetchDiscussions();
    this.commentRef[i].current.value = "";
  }
  render() {
    return (
        <div>
          <MlbNavbar/>
          <AddDiscussion show={this.state.addDiscussionModal} handleClose={this.handleClose} owner={this.context.userID}/>
          <div style={{ width: "60%", marginLeft: "20%", marginTop: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center"}}>
              <h1>Discussions</h1>
              <Button variant="info"
                style={{ marginLeft: "2rem", height: "2rem"}}
                onClick={this.handleAddDiscussionModal}
              >Add Discussion</Button>
            </div>
            <Form style={{marginTop: "2rem"}} onSubmit={(event) => this.handleSearch(event, this.state.searchOption, this.state.searchTerm)}> 
              <Form.Group as={Row}>
                <Col sm={5}>
                  <Form.Control type="text" placeholder="Search Term" onChange={(event)=>this.handleSearchTerm(event.target.value)}/>
                </Col>
                <Button style={{fontWeight: "bold", background: "#FAC917", color: "black", border: "1px solid #FAC917", opacity: "79%"}} type="submit">Search</Button>
                <DropdownButton id="dropdown" variant="outline-secondary" title="All Categories" style={{marginLeft: "1rem"}} >
                  <Dropdown.Item eventKey='All Categories' onClick={()=>{document.getElementById("dropdown").innerHTML="All Categories"; this.handleSearchOption("All");}}>All Categories</Dropdown.Item>
                  <Dropdown.Item eventKey="Tag" onClick={()=>{document.getElementById("dropdown").innerHTML="Tag"; this.handleSearchOption("Tag");}}>Tag</Dropdown.Item>
                  <Dropdown.Item eventKey="Title" onClick={()=>{document.getElementById("dropdown").innerHTML="Title"; this.handleSearchOption("Title");}}>Title</Dropdown.Item>
                  <Dropdown.Item eventKey="Content" onClick={()=>{document.getElementById("dropdown").innerHTML="Content"; this.handleSearchOption("Content");}}>Content</Dropdown.Item>
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
                      {discussion.owner}
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
                      {discussion.tag}
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
                            {comment.owner}
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
                <Card style={this.state.shownComments.includes(i + "") ? {marginLeft: "1rem", marginTop: "1rem", background: "#EEEEEE"} : { display: "none"}}>
                  <Card.Body>
                    <Card.Text>
                      <Form onSubmit={(event) => this.handleAddComment(event, i)}>
                        <Form.Control id="comment" as="textarea" rows="3" ref={this.commentRef[i]}/>
                        <Button style={{marginTop: "0.5rem"}} type="submit">Add Comment</Button>
                      </Form>
                    </Card.Text>
                  </Card.Body> 
                </Card>      

              </Card.Body>
            </Card>
          ))}
        </div>
    );
  }
}

export default Discussion;
