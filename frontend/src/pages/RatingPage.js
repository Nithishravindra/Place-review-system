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
            userComment: "",
            userRating: 0,
            errorMessage: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleRating = e => {
        // to get count of stars clicked by user
        this.setState({
            userRating: e.rating
        });
    }

    addNewComment = (placeId, e) => {
        e.preventDefault();

        if (this.state.userComment.length > 0 && this.state.userRating > 0) {
            this.setState({
                errorMessage: ""
            });
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
                <div className="page-left">
                    
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
            </div>
        );
    }
}

export default Rating;

