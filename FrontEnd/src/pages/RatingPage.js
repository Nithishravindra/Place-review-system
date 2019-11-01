import React, { Component } from 'react';
import Rater from 'react-rater';
import { Route, NavLink } from 'react-router-dom';
import 'react-rater/lib/react-rater.css';
import './Rating.css';
import feedBackPage from './feedBackPage';
import Popup from "reactjs-popup";

class Rating extends Component {
        constructor() {
            super();
            this.state = { 
                rate1: '',
                comment: '',
            
                listOfComments: [
                    {
                        newComment: 'woowwww'
                    },
                    {
                        newComment: 'abcdef'
                    },
                    
                ]
            };   

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleChange(e) {
            this.setState({
                [e.target.name]: e.target.value
              });
        }

        handle(e) {
            // to get count of stars clicked
            console.log(e.rating);

        }

        handleSubmit(e) {
            e.preventDefault();
    
            this.setState(previousState => ({
                listOfComments: [...previousState.listOfComments, { title: this.state.newComment  } ]
            }));
        }
   
        render(){
            const { comment } = this.state;
            const { description  } = this.props.location.state;
            const { dataPassed } = this.props.location || [];
            console.log(dataPassed);
                const clickedPlace = dataPassed !== undefined  ? dataPassed.listOfPlaces.find(
                            item => item.placeId === dataPassed.placeId
                      ) : [];
            
                  console.log(clickedPlace, "clickedPlace");
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
             
                {/* avg from db */}
                <div className="FormFieldQ">
                  <div className="FormFieldHead">
                        <h3>Average Rating </h3>
                    </div>
                    <div className="Rater-icon1">    
                        <Rater onRate={this.handle} />
                    </div>
                

                <div className="FormCenter">
                    <form onSubmit={this.handleSubmit} className="FormFields">
                        <div className="FormFieldQ">  
                            <h2>Your rating </h2> 
                        </div> 
                            {/* https://www.npmjs.com/package/react-rater */}
                        <div className="Rater-icon">    
                            <Rater onRate={this.handle} name="rate1" />
                        </div>
                        
                        <div className="FormFieldA">
                            <textarea type="text" placeholder="Enter your comment" defaultValue = { Comment } name= "comment" onChange={this.handleChange}/>
                       </div>
                       
                        <div className="FormFieldA">
                            <button onClick={this.handleSubmit} className="Form-Button">SUBMIT</button> 
                        </div>
                    </form>
                    </div>
            </div>
            <div className="comment_right">
            <h3>Comments</h3>
                {clickedPlace.comments.map(item => (
                      <div key={item.id}>
                        <ul>
                            <li> Name: {item.userName}</li> </ul>
                            <p>Comment: {item.commentText}</p>
                   
                        </div>
                    ))} 
            </div>

            {/* <Popup trigger={<button> Give us FeedBack here </button>} position="right center">
                     <div> was this site helpful </div>
            </Popup> */}

            <NavLink to="/feedBackPage" ClassName="feedback" >Give us FeedBack here </NavLink>
            <Route excat path="/feedBackPage" component={feedBackPage} />

        </div>  
    </div>
           





     )}
  }
  
  export default Rating;
  



