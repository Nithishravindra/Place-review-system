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
            userRating: 0,
            errorMessage: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    Logout = () => {
        localStorage.removeItem('userID')
        //localStorage.removeItem(userID);
        // fetch(`http://localhost:3000/logout`, {
        //     method: "POST",
        //      body: JSON.stringify({
        //          //to add current userID
        //        //userId
        //     }),
        //     headers: {
        //         "Content-type": "application/json",
        //         Accept: "application/json"
        //     }
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //     })	
    }

    addNewComment = (placeId, e) => {
        e.preventDefault();
        console.log(this.state.userRating)
        const userID = localStorage.getItem('userID');
        console.log('userID in ratingPage  = ', userID)
        if(this.state.userRating > 0){
            this.setState({
                errorMessage: " "
            })
            fetch(`http://localhost:3000/revStar/add`, {
                method: "POST",
                body: JSON.stringify({
                    
                    
                    TOTAL_RATING: this.state.userRating
                    
                }),
                headers: {
                    "content-type":"application/json",
                    Accept: "application/json"
                }
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })   
        }
        

        if (this.state.userComment.length > 0 ) {
            this.setState({
                errorMessage: ""
            });

            fetch(`http://localhost:3000/comment/add`, {
					method: "POST",
					 body: JSON.stringify({
                         // add currentUSERID and Clicketed placeId
						COMMENT: this.state.userComment
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

            // all to make api call
        } else {
            this.setState({
                errorMessage: "Please enter comment & User rating"
            });
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(this.state)
    }

    render() {

       //  const userID = localStorage.getItem('userID');
       // console.log('userID in rating page => ',userID);
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
                                    onRate={this.handleRating}/>
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
                                                this.addNewComment(clickedPlace.placeId,e)
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

