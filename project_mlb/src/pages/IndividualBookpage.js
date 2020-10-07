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
        this.state = { showText1: false};

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
                {/* style={{ width: '30rem', marginLeft: '2rem', marginTop: "2rem"}} */}
                <Card className="text-center" style={{width: "50%", marginLeft: "auto", marginRight: "auto", marginTop: "1rem", background: "#CEE4E9"}}>
                  <Card.Body>
                    <Card.Title><b>Book Information</b></Card.Title>
                    <Card.Img variant="top" src={harry} style={{ width: "20rem", padding: "1rem"}} />
                    <Table className="myTable" size="sm">
                      <tr><td><b>BOOK TITLE:</b></td><td>{this.props.location.book.title}</td></tr>
                      <tr><td><b>AUTHOR:</b> </td><td>{this.props.location.book.author}</td></tr>
                      <tr><td><b>PUBLISHER:</b> </td><td>{this.props.location.book.publisher}</td></tr>
                      <tr><td><b>ISBN:</b> </td><td>{this.props.location.book.isbn}</td></tr>
                      <tr><td><b>GENRE:</b> </td><td>{this.props.location.book.genre}</td></tr>
                      <tr><td><b>RATE:</b> </td>{this.createStar(this.props.location.book.rate)}</tr>
                      <tr><td><b>DESCRITION:</b> </td><td>{this.props.location.book.description}</td></tr>
                    </Table>
                  </Card.Body>
                </Card>
              
                

                <br></br><br></br>
                <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
                      BOOKSTORE OFFERS
                </h2>

                <Table size="sm" style={{ width: "70%", marginLeft: "auto", marginRight: "auto", paddingTop: "1rem"}}>
                <thead style={{ textAlign: "center", marginTop: "2rem" }}>
                    <tr>
                    <th>BOOKSTORE NAME</th>
                    <th>CONDITION</th>
                    <th>PRICE </th>
                    <th>PURCHASE REQUEST</th>                    
                    </tr>
                </thead>
                <tbody style={{ textAlign: "center", marginTop: "2rem" }}>
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
                    <td></td>
                    <td></td>
                    <td></td>
                    </tr>
        
                </tbody>
                </Table>
                <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
                  Reviews
                  </h3>
                <Table size="sm" style={{ width: "70%", marginLeft: "auto", marginRight: "auto", paddingTop: "1rem"}}>
                <thead style={{ textAlign: "center", marginTop: "2rem" }}>
                    <tr>
                    <th>REVIEWER</th>
                    <th>CONTENT </th>                   
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
                        <Button onClick={() => this.setState({ showText: !this.state.showText })}>Read more </Button>
                      </div>
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
                            <Button onClick={() => this.setState({ showText1: !this.state.showText1 })}> Read more </Button>
                          </div>

                    </td>
                    
                    </tr>
                    <tr>
                    <td></td>
                    <td></td>
                    </tr>

                </tbody>
                </Table>
                          <h5 style={{ textAlign: "center", marginTop: "2rem",marginBottom:"2rem" }}>
                             If you want to leave the comment
                             <Button variant="info" onClick={this.handleAddreview}>Add Reivew</Button>
                           </h5>
            </div>
          </React.Fragment>
        );
    }
}

export default IndividualBookpage;


