import React, {Component} from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import EditProfileModal from '../components/EditProfileModal';
import ViewRequestInfoModal from '../components/ViewRequestInfoModal';
import MlbNavbar from '../components/NavigationBar.js'
import AuthContext from '../context/AuthContext';

class Profile extends Component{
    state = {
      userInfo: {lastName:"", firstName:"", location:"", email:"", preferredGenres:[]},
      user: [],
      prefList: [],
      editProfile: false,
      viewrequestInfo : false,
      requestSelected: null,
      sentRequests: [],
      isLoading: false
    }
    static contextType = AuthContext;
    componentDidMount() {
      this.fetchUserInfo();
      this.fetchRequests();
    }
    fetchUserInfo() {
      this.setState({isLoading: true});
      const requestBody = {
        query: `
            query{
              findByUserID(userID: "${this.context.userID}"){
                _id
                firstName
    						lastName
    						email
    						userID
    						location
    						preferredGenres
              }
            }
        `
      }
      fetch('http://localhost:8000/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed to fetch user!")
        }
        return res.json()
      })
      .then(resData => {
          console.log("User info successfully fetched", resData);
          const userInfo = resData.data.findByUserID;
          console.log(userInfo);
          const user = [];
          const prefList = [];
          for (const [i, value] of userInfo.preferredGenres.entries()) {
              prefList.push(<Button key={i} variant="outline-danger" size="sm" style={{marginLeft:"0.2rem"}} disabled>{value}</Button>)
          }
          user.push(
            <Table size="sm" style={{ minWidth: "900px", maxWidth: "1100px", marginLeft: "10%", marginRight: "auto", marginTop: "1.2rem"}}>
                    <tr><td>Name </td><td>{userInfo.firstName + " " + userInfo.lastName}</td></tr>
                    <tr><td>User ID </td><td>{userInfo.userID}</td></tr>
                    <tr><td>Location </td><td>{userInfo.location}</td></tr>
                    <tr><td>Email </td><td>{userInfo.email}</td></tr>
                    <tr><td>Preference </td><td>{prefList}</td></tr>
                    <tr><td></td><td style={{textAlign:"right"}}><Button variant="info" onClick={this.handleEditProfile} style={{marginRight:"0.2rem"}}>Edit Profile</Button><Button variant="info" onClick={this.handleChangePassword}>Change Password</Button></td></tr>
                </Table>
          );
          this.setState({userInfo: userInfo, user: user, isLoading: false, prefList: prefList});
      })
    }
    fetchRequests() {
      this.setState({isLoading: true});
      const requestBody = {
        query: `
            query{
              sentRequests(senderID: "${this.context.user_id}"){
                bookTitle
                sender{
                  _id
                  userID
                  email
                }
                receiver{
                  _id
                  userID
                  email
                }
                status
                date
                _id
              }
            }
        `
      }
      fetch('http://localhost:8000/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed to fetch requests!")
        }
        return res.json()
      })
      .then(resData => {
          console.log("Sent Requests are successfully fetched", resData);
          const sentRequests = resData.data.sentRequests;
          console.log(sentRequests);
          this.setState({sentRequests: sentRequests, isLoading: false});
      })
    }
    handleViewMoreInfo = (request) => {
      // shows more information
      console.log(request);
      this.setState({viewrequestInfo: true, requestSelected: request});
    }
    handleEditProfile = () => {
      this.setState({editProfile: true});
    }
    handleChangePassword = () => {
      // handle this later
    }
    handleClose = () => {
      this.setState({editProfile: false, viewrequestInfo : false});
    }

    render(){

        return (
            <React.Fragment>
                <MlbNavbar/>
                <EditProfileModal  show={this.state.editProfile} handleClose={this.handleClose} person={this.state.userInfo}/>
                {this.state.requestSelected && <ViewRequestInfoModal show={this.state.viewrequestInfo} handleClose={this.handleClose} request={this.state.requestSelected}/>}
                <div style={{marginLeft: "10%", marginTop: "2rem", background: "#eeeeee", width: "15%", textAlign: "center", borderRadius: "4rem", padding: "0.6rem"}}>
                  <h1 style={{fontSize: "2rem"}}>Profile</h1>
                </div>
                <Container style={{marginLeft: "10%",  marginTop: "2rem"}}>
                  <h4>Personal Information</h4>
                </Container>
                {this.state.user}
                {/*<Table size="sm" style={{ minWidth: "900px", maxWidth: "1100px", marginLeft: "10%", marginRight: "auto", marginTop: "1.2rem"}}>
                    <tr><td>Name </td><td>{this.state.user.firstName + " " + this.state.user.lastName}</td></tr>
                    <tr><td>User ID </td><td>{this.state.user.userID}</td></tr>
                    <tr><td>Location </td><td>{this.state.user.location}</td></tr>
                    <tr><td>Email </td><td>{this.state.user.email}</td></tr>
                    <tr><td>Phone Number </td><td>{this.person.phone}</td></tr>}
                    <tr><td>Preference </td><td>{this.state.prefList}</td></tr>
                    <tr><td></td><td style={{textAlign:"right"}}><Button variant="info" onClick={this.handleEditProfile} style={{marginRight:"0.2rem"}}>Edit Profile</Button><Button variant="info" onClick={this.handleChangePassword}>Change Password</Button></td></tr>
                </Table>*/}

                <Container style={{marginLeft: "10%"}}>
                  <h4>My Requests</h4>
                </Container>
                <Table size="sm" style={{ minWidth: "900px", maxWidth: "1100px", marginLeft: "10%", marginRight: "auto", marginTop: "1.2rem"}}>
                  <thead>
                    <tr>
                      <th>Request Date</th>
                      <th>Request Status</th>
                      <th>Book Title</th>
                      <th>Owner</th>
                      {/* <th></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.sentRequests && this.state.sentRequests.map((request) => (    
                      <tr>
                        <td>{request.date}</td>
                        <td>{request.status}</td>
                        <td>{request.bookTitle}</td>
                        <td>{request.receiver.userID}</td>                     
                        {/* <td style={{textAlign:"right"}}><Button variant="info" size="sm" onClick={()=>{this.handleViewMoreInfo(request)}}>View More Information</Button></td> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
            </React.Fragment>
        )
    }
}

export default Profile;
