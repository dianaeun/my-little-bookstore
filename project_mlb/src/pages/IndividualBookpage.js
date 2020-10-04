import React, {Component} from 'react';
import { Form, Button, Table, Collapse } from "react-bootstrap";
import Addreview from '../components/Addreview';
import RequestModal from '../components/RequestModal';
const star = require("../icons/star.png");

class IndividualBookpage extends Component{
    state={
        addreview : false,
        request : false
    }

    createStar = (n) => {
        let stars = [];
        for (let i = 0; i < n; i++){
          stars.push(<img src={star} alt="star" style={{ width: "22px" }} />);
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

      componentWillMount() {
        this.state = {
          isOpen: false,
        };
        this.items = [
         ['Book for beginners. Important!'],
         ['Easy to understand and easy to read']         
        ];
      }
      
      toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }

      getRenderedItems() {
        if (this.state.isOpen) {
          return this.items;
        }
        return this.items.slice(6);
      }
      

      bookinfo = {booktitle: 'Introduction To Java Programming', author: 'Y. Daniel Liang', 
            publisher: 'Prentice Hall', publishedyear: '2009', ISBN: '9780136042587', genre: 'Textbook',rate: 5,description: 'NA'};
    render(){

        return (
            <div>
                <Addreview show={this.state.addreview} handleClose={this.handleClose}/>
                <RequestModal show={this.state.request} handleClose={this.handleClose}/>
                <h1>BOOK INFORMATION</h1>
                <table>
                    <tr><td>BOOK TITLE: </td><td>{this.bookinfo.booktitle}</td></tr>
                    <tr><td>AUTHOR: </td><td>{this.bookinfo.author}</td></tr>
                    <tr><td>PUBLISHER: </td><td>{this.bookinfo.publisher}</td></tr>
                    <tr><td>ISBN: </td><td>{this.bookinfo.publishedyear}</td></tr>
                    <tr><td>GENRE: </td><td>{this.bookinfo.ISBN}</td></tr>
                    <tr><td>RATE: </td><td>{this.createStar(this.bookinfo.rate)}</td></tr>
                    <tr><td>GENRE: </td><td>{this.bookinfo.genre}</td></tr>
                    <tr><td>DESCRITION: </td><td>{this.bookinfo.description}</td></tr>
                </table>
                
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
                    <th>TITLE</th>                   
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>HYEONJOON LEE</td>
                    <td>Book for beginners </td>
                    <td><div>
                        {this.getRenderedItems().map((item, id) => (
                        <div key={0}>{this.items[0]}</div>
                        ))}
                        <button onClick={this.toggle}>
                        {this.state.isOpen ? 'less' : 'Read more'}
                        </button>
                        </div>
                        </td>                            
                    </tr>
                    <tr>
                    <td>DAYE EUN</td>
                    <td>Easy</td>
                    <td><div>
                        {this.getRenderedItems().map((item, id) => (
                        <div> {this.items[1]}</div>
                        ))}
                        <button onClick={this.toggle}>
                        {this.state.isOpen ? 'less' : 'Read more'}
                        </button>
                        </div></td>
                    </tr>
        
                </tbody>
                </Table>
                  <Button variant="info" onClick={this.handleAddreview}>Add Reivew</Button>         
            </div>
        );
    }
}

export default IndividualBookpage;