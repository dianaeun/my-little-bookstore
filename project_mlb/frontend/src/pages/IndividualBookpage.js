import React, {Component} from 'react';
import {Collapse,Button, Table, Card, CardDeck } from "react-bootstrap";
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
        this.state = { showText1: false};

    }

    toggle = () => {
      this.setState({ isOpen: !this.state.isOpen });
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
                <div style={{marginLeft: "2%", marginTop: "2rem", background: "#eeeeee", width: "30%", textAlign: "center", borderRadius: "4rem", padding: "0.6rem"}}>
                  <h1 style={{fontSize: "2rem"}}>Book Information</h1>
                </div>

                <CardDeck>
                  <Card className="text-center" style={{ marginLeft: "3%",flex: "1", marginTop: "2rem", background: "#CEE4E9"}}>
                    <Card.Body>
                      <Card.Title><b>{this.props.location.book.title}</b></Card.Title>
                      <Card.Img variant="top" src={harry} style={{ width: "20rem", padding: "1rem"}} />
                      <Table className="myTable" size="sm">
                        <tr><td><b>AUTHOR:</b> </td><td>{this.props.location.book.author}</td></tr>
                        <tr><td><b>PUBLISHER:</b> </td><td>{this.props.location.book.publisher}</td></tr>
                        <tr><td><b>ISBN:</b> </td><td>{this.props.location.book.isbn}</td></tr>
                        <tr><td><b>GENRE:</b> </td><td>{this.props.location.book.genre}</td></tr>
                        <tr><td><b>RATE:</b> </td>{this.createStar(this.props.location.book.rate)}<Button>Rate</Button></tr>
                        <tr><td><b>DESCRITION:</b> </td><td>{this.props.location.book.description}</td></tr>
                      </Table>
                    </Card.Body>
                  </Card>

                  <Card className="text-center" style={{flex: "2", marginTop: "2rem"}}>
                    <Card.Body>
                      <Card.Title><h3>BOOKSTORE OFFERS</h3></Card.Title>                    
                      <Table className="myTable" size="sm" style={{marginTop: "1rem"}}>
                        <thead style={{ marginTop: "4rem" }}>
                          <tr>
                            <th style={{width: '30%'}}>BOOKSTORE NAME</th>
                            <th style={{width: '20%'}}>CONDITION</th>
                            <th style={{width: '20%'}}>PRICE </th>
                            <th style={{width: '30%'}}>PURCHASE REQUEST</th>                    
                          </tr>
                        </thead>
                        <tbody style={{  marginTop: "2rem" }}>
                          <tr>
                          <td>HYEONJOON's BOOKSTORE</td>
                          <td>LIKE NEW</td>
                          <td>$15</td>
                          <td><Button variant="info" onClick={this.handleRequestmodal}> BUY</Button></td>
                          </tr>
                          <tr>
                          <td>DAYE's BOOKSTORE</td>
                          <td>SOME MARKS</td>
                          <td>$5 </td>
                          <td><Button variant="info" onClick={this.handleRequestmodal}> BUY</Button></td>
                          </tr>
                        </tbody>                    
                      </Table>
                    </Card.Body>
                      
                    <Card.Title style={{marginBottom: "0rem"}}><h3>REVIEWS</h3></Card.Title>      
                    <Card.Body>             
                      <Table size="sm" style={{margin: "0rem"}}>
                        <thead style={{ textAlign: "center", marginTop: "0rem" }}>
                            <tr>
                              <th style={{width: '30%'}}>REVIEWER</th>
                              <th style = {{ width: "40%"}}>CONTENT </th> 
                              <th></th>                  
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center", marginTop: "2rem" }}>
                            <tr>
                            <td>HYEONJOON LEE</td>
                            <td>{this.props.location.book.Title1}
                            <div>
                            <Collapse in={this.state.showText}>
                              <div>
                                <span>                          
                                {this.props.location.book.hycomment}
                              </span>
                              </div>
                                </Collapse>
                              </div>
                              </td>
                              <td>
                              <Button variant="info" onClick={() => this.setState({ showText: !this.state.showText })}> {this.state.showText ? 'Read less' : 'Read more'}</Button>
                              </td>
                            </tr>
                            <tr>
                            <td>DAYE EUN</td>
                            <td>{this.props.location.book.Title2}
                            <div>
                                <Collapse in={this.state.showText1}>
                                  <div>
                                    <span>
                                    {this.props.location.book.dayecomment}
                                </span>
                                  </div>
                                    </Collapse>
                                  </div>
                            </td>
                            <td>
                                <Button variant="info" onClick={() => this.setState({ showText1: !this.state.showText1 })}> {this.state.showText1 ? 'Read less' : 'Read more'} </Button>
                            </td>
                            </tr>   
                        </tbody>
                      </Table>
                      <h5 style={{ textAlign: "center", marginTop: "3.5rem",marginBottom:"2rem" }}>                            
                        <Button variant="info" style={{ fontWeight: "bold", marginLeft: "1rem", color: "#FAC917", background: "#22525F"}} onClick={this.handleAddreview}>Add Review</Button>
                      </h5>
                    </Card.Body>
                  </Card>
                </CardDeck>
        
                
           
                          
            </div>
          </React.Fragment>
        );
    }
}

export default IndividualBookpage;


