import React, {Component} from 'react';
import { Jumbotron, Button, Table, Container } from 'react-bootstrap';
import EditProfileModal from '../components/EditProfileModal';
import ViewRequestInfoModal from '../components/ViewRequestInfoModal';
import MlbNavbar from '../components/NavigationBar.js'

class Profile extends Component{
    state = {
      editProfile: false,
      viewrequestInfo : false,
      requestSelected: null
    }
    handleViewMoreInfo = (request) => {
      // shows more information
      console.log(request);
      this.setState({viewrequestInfo: true, requestSelected: request});
    }
    handleEditProfile = () => {
      this.setState({editProfile: true});
    }
    handleClose = () => {
      this.setState({editProfile: false, viewrequestInfo : false});
    }
    // dummy data for profile
    person = {name: 'Daye Eun', location: 'Incheon Yeonsu', 
            contact: '010-0113-0328', preference: ['Romance', 'Science', 'Horror']};

    requests = [{date: '2019/09/04', status: 'Accepted', title: 'Harry Potter and the Philosopher', owner: 'DongHun Kim'},
                {date: '2019/09/05', status: 'Declined', title: 'Life', owner: 'Simok Hwang'},
               {date: '2019/09/28', status: 'Pending', title: 'Harry Potter and the Prisoner of Azkaban', owner: 'DongHun Kim'}]

    render(){
        const prefList = []

        for (const [_index, value] of this.person.preference.entries()) {
            prefList.push(<Button variant="outline-danger" size="sm" style={{marginLeft:"0.2rem"}}>{value}</Button>)
        }

        return (
            <div>
                <MlbNavbar/>
                <EditProfileModal  show={this.state.editProfile} handleClose={this.handleClose} person={this.person}/>
                {this.state.requestSelected && <ViewRequestInfoModal show={this.state.viewrequestInfo} handleClose={this.handleClose} request={this.state.requestSelected}/>}
                <div>
                <Jumbotron fluid style={{height: "5rem", fontSize: "1rem", padding: "0rem"}}>
                  <Container style={{padding: "1.5rem"}}>
                    <h2>Profile</h2>
                  </Container>
                </Jumbotron>
                <Table style={{ minWidth: "900px", maxWidth: "1100px", marginLeft: "auto", marginRight: "auto"}}>
                    <tr><td>Name </td><td>{this.person.name}</td></tr>
                    <tr><td>Location </td><td>{this.person.location}</td></tr>
                    <tr><td>Contact </td><td>{this.person.contact}</td></tr>
                    <tr><td>Preference </td><td>{prefList}</td></tr>
                    <tr><td></td><td style={{textAlign:"right"}}><Button onClick={this.handleEditProfile}>Edit Profile</Button></td></tr>
                </Table>

                {/* <Jumbotron fluid style={{height: "5rem", fontSize: "1rem", padding: "0rem"}}>*/}
                  <Container>
                    <h4>My Requests</h4>
                    <br></br>
                  </Container>
                {/*</Jumbotron> */}
                <Table size="sm" style={{ minWidth: "900px", maxWidth: "1100px", marginLeft: "auto", marginRight: "auto"}}>
                  <thead>
                    <tr>
                      <th>Request Date</th>
                      <th>Request Status</th>
                      <th>Book Title</th>
                      <th>Owner</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.requests.map((request) => (    
                      <tr>
                        <td>{request.date}</td>
                        <td>{request.status}</td>
                        <td>{request.title}</td>
                        <td>{request.owner}</td>                     
                        <td style={{textAlign:"center"}}><Button onClick={()=>{this.handleViewMoreInfo(request)}}>View More Information</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                </div>
            </div>
        )
    }
}

export default Profile;
