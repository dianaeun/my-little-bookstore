import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class Profile extends Component{
    viewMoreInfo = () => {
        // shows more information
    }
    // dummy data for profile
    person = {name: 'Daye Eun', location: 'Incheon Yeonsu', 
            contact: '010-0113-0328', preference: ['Romance', 'Science', 'Horror']};

    requests = [{date: '2019/09/04', title: 'Harry Potter and the Philosopher', owner: 'DongHun Kim'},
               {date: '2019/09/28', title: 'Harry Potter and the Prisoner of Azkaban', owner: 'DongHun Kim'}]

    render(){
        const prefList = []

        for (const [_index, value] of this.person.preference.entries()) {
            prefList.push(<Button>{value}</Button>)
        }

        return (
            <div>
                <h2>Profile</h2>
                <table>
                    <tr><td>Name: </td><td>{this.person.name}</td></tr>
                    <tr><td>Location: </td><td>{this.person.location}</td></tr>
                    <tr><td>Contact: </td><td>{this.person.contact}</td></tr>
                    <tr><td>Preference: </td><td>{prefList}</td></tr>
                </table>
                <Button>Edit Profile</Button>
                <br></br><br></br>

                <h3>My Requests</h3>
                <Table size="sm" style={{ width: "1000px", marginLeft: "auto", marginRight: "auto"}}>
                  <thead>
                    <tr>
                      <th>Request Date</th>
                      <th>Book Title</th>
                      <th>Owner</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.requests.map((request) => (    
                      <tr>
                        <td>{request.date}</td>
                        <td>{request.title}</td>
                        <td>{request.owner}</td>                     
                        <td><Button onClick={this.viewMoreInfo}>View More Information</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
            </div>
        )
    }
}

export default Profile;
