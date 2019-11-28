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
            errorMessage: "",
            responseFromApi: "",
            isLoading: false,
            responseAvg: "",
            placeId: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRate = this.handleRate.bind(this)
    }


    addNewComment = (placeId, userComment, userRating) => {
        console.log('placeid in addnewcomment == ', placeId, userComment, userRating)
        const cUserID = localStorage.getItem('userID');
        if (this.state.userComment.length > 0) {
            fetch(`http://localhost:3000/comment/add`, {
                method: "POST",
                body: JSON.stringify({
                    userID: cUserID,
                    COMMENT: this.state.userComment,
                    userRating: this.state.userRating,
                    placeId: placeId
                }),
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json"
                }
            })
                .then(res => {
                    res.json()
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

    handleRate(e) {
        const TOTAL_RATING = e.rating;
        console.log('lololol', TOTAL_RATING)
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

    componentDidMount() {

        let title = this.props.match.params.placeName
        fetch(`http://localhost:3000/places/${title}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json"
            }
        })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                this.setState({
                    resPlace: response.placeItem,
                    responseAvg: response.averageItem,
                    responseComment: response.commentList,
                    isLoading: false
                })
                console.log("Api response ", response.averageItem)

            })

        //if(responseAvg.average_rating === 0 ) {
        //     this.setState({
        //         errorMessage: "Be the first to comment and rate"
        //     })
        //    }
    }

    render() {

        const { userComment, userRating, errorMessage, resPlace, responseAvg, responseComment } = this.state;


        if (resPlace === undefined) {
            return <p>No Data!</p>;
        }

        return (
            <div className="Appp">
                <div className="FormFieldA">

                    {resPlace.map((item, index) => (
                        <div key={index}>
                            <h1>{item.place_title}</h1>
                        </div>
                    ))}

                    {resPlace.map((item, index) => (
                        <div key={index} class="holder">
                            <p>{item.place_description}</p>
                        </div>
                    ))}
                </div>

                <div className="rating-wrapper">
                    <div className="">
                        <div className="">
                        <h3>Average Rating</h3>
                        <Rater rating={responseAvg.average_rating} />
                        <h3>Your Rating</h3>
                        <Rater
                            rating={userRating}
                            onRate={this.handleRate} name="userRating" />

                            <textarea
                                type="text"
                                placeholder="Enter your comment"
                                defaultValue={userComment}
                                name="userComment"
                                onChange={this.handleChange}
                            />
                            <h2 style={{ color: "white", margin: 50 }}>{errorMessage} </h2>
                        </div>

                        <div className="FormFieldA">
                            <button
                                onClick={e =>
                                    this.addNewComment(resPlace[0].place_id, userComment, userRating)
                                }
                                className="Form-Button">
                                SUBMIT
                                </button>
                        </div>
                    </div>

                    <div className="comment_right">
                        <h3>Comments</h3>
                        {responseComment.map(item => (
                            <div key={item.comment_id}>
                                <ul>
                                    <li>Name:{item.name}</li>{" "}
                                </ul>
                                <p>Comment: {item.comment}</p>
                            </div>
                        ))}

                        {/* <button onClick={this.Logout}
                            className="Form-Button">  LOGOUT
                            </button>  */}

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


