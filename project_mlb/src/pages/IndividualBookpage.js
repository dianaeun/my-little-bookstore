import React, {Component} from 'react';
import {Collapse,Button, Table, Card } from "react-bootstrap";
import Addreview from '../components/Addreview';
import RequestModal from '../components/RequestModal';
import MlbNavbar from '../components/NavigationBar.js'

const star = require("../icons/star.png");
const harry = require("../icons/harrypotter.png");
const blankStar = require("../icons/blank_star.png");

class IndividualBookpage extends Component{
    state = {
        addreview: false,
        request: false,
    }

    constructor(){
      super();
      
        this.state = { showText: false };

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
    handleClose = () => {
        this.setState({addreview: false, request: false});
    }
    handleAddreview = () => {
      this.setState({addreview: true});
    }
    handleRequestmodal = () => {
      this.setState({request: true});
    }

    render(){

        return (
          <React.Fragment>
            <MlbNavbar/>
            <div>
                <Addreview show={this.state.addreview} handleClose={this.handleClose}/>
                <RequestModal show={this.state.request} handleClose={this.handleClose}/>
                <Card style={{ width: '30rem', marginLeft: '2rem', marginTop: "2rem"}}>
                  <Card.Img variant="top" src={harry} style={{ width: "15rem", padding: "0rem", marginLeft: "7.5rem"}} />
                  <Card.Body>
                    <Card.Title>Book Information</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.location.book.title}</Card.Subtitle>
                    <Table size="sm">
                      <tr><td>BOOK TITLE: </td><td>{this.props.location.book.title}</td></tr>
                      <tr><td>AUTHOR: </td><td>{this.props.location.book.author}</td></tr>
                      <tr><td>PUBLISHER: </td><td>{this.props.location.book.publisher}</td></tr>
                      <tr><td>ISBN: </td><td>{this.props.location.book.isbn}</td></tr>
                      <tr><td>GENRE: </td><td>{this.props.location.book.genre}</td></tr>
                      <tr><td>RATE: </td>{this.createStar(this.props.location.book.rate)}</tr>
                      <tr><td>DESCRITION: </td><td>{this.props.location.book.description}</td></tr>
                    </Table>
                  </Card.Body>
                </Card>

                <br></br><br></br>
                <h2>BOOKSTORE OFFERS</h2>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>BOOKSTORE NAME</th>
                    <th>CONDITION</th>
                    <th>PRICE </th>                    
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>HYEONJOON's BOOKSTORE</td>
                    <td>LIKE NEW</td>
                    <td>$15</td>
                    <td><Button variant="info" onClick={this.handleRequestmodal}> Request</Button></td>
                    </tr>
                    <tr>
                    <td>DAYE's BOOKSTORE</td>
                    <td>SOME MARKS</td>
                    <td>$5 </td>
                    <td><Button variant="info" onClick={this.handleRequestmodal}> Request</Button></td>
                    </tr>
        
                </tbody>
                </Table>
                <h3>Reviews</h3>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>REVIEWER</th>
                    <th>TITLE </th>                   
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>HYEONJOON LEE</td>
                    <td>{this.props.location.book.Title1}
                    <div>
                    
                    <a onClick={() => this.setState({ showText: !this.state.showText })}>Read more</a>
                        <Collapse in={this.state.showText}>
                          <div>
                            <span>                          
                            {this.props.location.book.hycomment}
                        </span>
                          </div>
                            </Collapse>
                          </div>
                       </td>
                   
                    </tr>
                    <tr>
                    <td>DAYE EUN</td>
                    <td>{this.props.location.book.Title2}
                    <div>

                    <a onClick={() => this.setState({ showText: !this.state.showText })}> Read more</a>
                        <Collapse in={this.state.showText}>
                          <div>
                            <span>
                            {this.props.location.book.dayecomment}
                        </span>
                          </div>
                            </Collapse>
                          </div>

                    </td>
                    
                    </tr>
        
                </tbody>
                </Table>
                  <Button variant="info" onClick={this.handleAddreview}>Add Reivew</Button>         
            </div>
          </React.Fragment>
        );
    }
}

export default IndividualBookpage;