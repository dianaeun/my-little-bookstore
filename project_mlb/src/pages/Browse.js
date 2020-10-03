import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const star = require("../icons/star.png");
const blankStar = require("../icons/blank_star.png");

class Browse extends Component{
    searchBook = (val) => {
        // do the actual searching
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

    render(){
        var genres = ['Romance', 'Horror', 'Fantasy', 'Adventure', 'Science']

        const searchGenres = []

        for (const [_index, value] of genres.entries()) {
            searchGenres.push(<input type="checkbox" value={value} name="genre"/>)
            searchGenres.push(<label>{value}</label>)
        }


        // dummy data for book information
        var book1 = ['Introduction To Java Programming', 'Y. Daniel Liang', 5, 3.50]
        var book2 = ['The Three Little Pigs', 'Authur Lee', 5, 5.5]
        var book3 = ['Cinderella', 'Alex Khun', 4, 7.0]
        var book4 = ['Alice in Wonderland', 'Carroll', 2, 4.0]
        var books = [book1, book2, book3, book4]

        const items = []


        for (const [_index, value] of books.entries()) {
          items.push(<tr><td><Link href="#">{value[0]}</Link></td>
                    <td><Link href="#">{value[1]}</Link></td>
                    {this.createStar(value[2])}
                    <td>$ {value[3]}</td></tr>)

        }
        

        return (
            <div>
                <span>
                    <input type="text" id="search" name="search"></input>
                    <Button
                    title="Search"
                    onClick={this.searchBook()}
                    />
                </span>
                <span>
                <h4>Advanced Search</h4>
                <label>Genre</label>
                {searchGenres}
                <br></br>
                <label>Location</label>
                <input type="checkbox" value="nearMe" name="nearMe" /> Near Me

                </span>


                <span>
                <h3>Resulting Books</h3>
                <label>Sort By</label>
                <input type="radio" value="Rating" name="sortBy" /> Rating 
                <input type="radio" value="Price" name="sortBy" /> Price 
                <input type="radio" value="Alphabet" name="sortBy" /> Alphabet
                </span>
                <Table size="sm" style={{ width: "1000px", marginLeft: "auto", marginRight: "auto"}}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Avg. Rating</th>
                            <th>Lowest Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Browse;
