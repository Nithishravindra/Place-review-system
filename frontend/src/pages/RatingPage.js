import React, { Component } from "react";
import Rater from "react-rater";
import { Route, NavLink } from "react-router-dom";
import "react-rater/lib/react-rater.css";
import "./Rating.css";
import feedBackPage from "./feedBackPage";

class Rating extends Component {
    constructor() {
        super();
        this.state = {
            userID: "",
            userComment: "",
            userRating: "",
            errorMessage: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRate = this.handleRate.bind(this)
    }

    Logout = (e) => {
        const cUserID = localStorage.getItem('userID');
        fetch(`http://localhost:3000/users/logout`, {
                method: "POST",
                body: JSON.stringify({
                    userID: cUserID
                }),
                headers: {
                    "content-type":"application/json",
                    Accept: "application/json"
                }
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                    if(response.statusCode === 200){
                        localStorage.removeItem('userID')
                        alert(`Thank you!`)
                        this.props.history.push(`/sign-in`)
                    }
                    else {
                        this.setState({
                            errorMessage: "AUTH failed"
                        })
                    }
            }) 
    }

    
    addNewComment = (placeId, e) => {
        e.preventDefault();
        const cUserID = localStorage.getItem('userID');
        if (this.state.userComment.length > 0 ) {
            fetch(`http://localhost:3000/comment/add`, {
					method: "POST",
					 body: JSON.stringify({
                        userID: cUserID,
                        COMMENT: this.state.userComment,
                        userRating: this.state.userRating

					}),
					headers: {
						"Content-type": "application/json",
						Accept: "application/json"
					}
				})
            .then(res => {
                console.log('hey token ', res)                           
            })
            .then(data => {
                console.log(data)          
            })	

            
        } else {
            this.setState({
                errorMessage: "Please enter comment & User rating"
            });
        }
    }

    handleRate(e){
        const TOTAL_RATING = e.rating;
        console.log('lololol',TOTAL_RATING)
        this.setState({
            userRating: TOTAL_RATING
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(this.state)
    }


    render() {

        const { userComment, userRating, errorMessage } = this.state;
        const { dataPassed } = this.props.location || [];
        const clickedPlace =
            dataPassed !== undefined
                ? dataPassed.listOfPlaces.find(
                        item => item.placeId === dataPassed.placeId
                  )
                : [];

        if (dataPassed === undefined) {
            return <p>No Data!</p>;
        }

        return (
            <div className="Appp">
                    <div className="FormFieldA">
                        <h1>{clickedPlace.title}</h1>
                    </div>

                    <div className="holder">
                        <p>{clickedPlace.description}</p>
                    </div>

                    <div className="rating-wrapper">
                            <div className="rating-section">
                                <h3>Average Rating</h3>
                                <Rater rating={clickedPlace.averageRating}/>
                            </div>
                            
                            <div className="rating-section">
                                <h3>Your Rating</h3>
                                <Rater
                                    rating={userRating}
                                    onRate={this.handleRate} name = "userRating"/>
                            </div>
                            
                            <div className="FormFieldQ">
                                    <div className="FormFieldA">
                                        <textarea
                                            type="text"
                                            placeholder="Enter your comment"
                                            defaultValue={userComment}
                                            name="userComment"
                                            onChange={this.handleChange}
                                        />
                                        <h2 style={{ color: "red",margin: 50  }}>{errorMessage} </h2>
                                    </div>
                                    <div className="FormFieldA">
                                        <button
                                            onClick={e =>
                                                this.addNewComment(clickedPlace.placeId,e,userRating)
                                            }
                                            className="Form-Button">
                                            SUBMIT
                                        </button>
                                    </div>
                            </div>
                        
                        <div className="comment_right">
                            <h3>Comments</h3>
                            {clickedPlace.comments.map(item => (
                                <div key={item.id}>
                                    <ul>
                                        <li>Name:{item.userName}</li>{" "}
                                    </ul>
                                    <p>Comment: {item.commentText}</p>
                                </div>
                            ))}

                              <button onClick={this.Logout}
                            className="Form-Button">  LOGOUT
                            </button> 

                        </div>
                    </div>

                    <NavLink to="/feedBackPage" ClassName="feedback">
                        Give us FeedBack here{" "}
                    </NavLink>

                    <Route
                        excat
                        path="/feedBackPage"
                        component={feedBackPage}
                    />
            </div>
        );
    }
}

export default Rating;

