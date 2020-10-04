import React, {Component} from 'react';
import { Jumbotron, Button, Table, Container } from 'react-bootstrap';
import EditProfileModal from '../components/EditProfileModal';
import ViewRequestInfoModal from '../components/ViewRequestInfoModal';
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
               {date: '2019/09/28', status: 'Pending', title: 'Harry Potter and the Prisoner of Azkaban', owner: 'DongHun Kim'}]

    render(){
        const prefList = []

        for (const [_index, value] of this.person.preference.entries()) {
            prefList.push(<Button variant="info" style={{margin:"0.1rem"}}>{value}</Button>)
        }

        return (
            <div>
                <EditProfileModal  show={this.state.editProfile} handleClose={this.handleClose} person={this.person}/>
                {this.state.requestSelected && <ViewRequestInfoModal show={this.state.viewrequestInfo} handleClose={this.handleClose} request={this.state.requestSelected}/>}
                <Jumbotron fluid>
                  <Container>
                <h3>Profile</h3>
                <Table>
                    <tr><td>Name: </td><td>{this.person.name}</td></tr>
                    <tr><td>Location: </td><td>{this.person.location}</td></tr>
                    <tr><td>Contact: </td><td>{this.person.contact}</td></tr>
                    <tr><td>Preference: </td><td>{prefList}</td></tr>
                    <tr><td></td><td></td><td><Button onClick={this.handleEditProfile}>Edit Profile</Button></td></tr>
                </Table>
                </Container>
                </Jumbotron>

                <Container>
                <h3>My Requests</h3>
                <Table size="sm" style={{ width: "1000px", marginLeft: "auto", marginRight: "auto"}}>
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
                        <td><Button onClick={()=>{this.handleViewMoreInfo(request)}}>View More Information</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                </Container>
            </div>
        )
    }
}

export default Profile;
