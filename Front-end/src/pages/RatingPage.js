import React, { Component } from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import './Rating.css';

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
            
            this.setState ({
            [e.target.rate1]: e.target.value
            });
        }

        handle(e) {
            // to get count of stars clicked
            console.log(e.rating);

        }

        handleSubmit(e) {
            e.preventDefault();
           
            // this.setState(previousState => ({
            //     newComment: [...previousState.comment, { comment: this.state.comment }]
            // }))
        }
   


        render(){
            const { comment } = this.state;
            const { description  } = this.props.location.state;
            console.log(comment);
       return (  
            <div className="Appp"> 
                <div className="FormFieldA">
                    <h1>{this.props.match.params.placeName}</h1> 
                </div>
            
                <div className="FormFieldTe">
                    <p>{description}</p>
                </div>    
                

                {/* avg from db */}
                <div className="FormFieldQ">
                    <div className="FormFieldHead">
                        <h3>Average Rating </h3>
                    </div>
                    <div className="Rater-icon1">    
                        <Rater onRate={this.handle} />
                    </div>
                </div>
                        

                
                <div className="FormCenter">
                    <form onSubmit={this.handleSubmit} className="FormFields">
                        
                        <div className="FormF">
                            <div className="FormFieldHead">
                                <h2>Your rating </h2>
                            </div>

                            {/* https://www.npmjs.com/package/react-rater */}

                            <div className="Rater-icon">    
                                 <Rater onRate={this.handle} name="rate1" />
                            </div>
                        </div>
                        
                        <div className="FormFieldA">
                            <textarea type="text" placeholder = "Enter your comment" defaultValue = { Comment } name= "comment" onChange={this.handleChange}/>
                       </div>
                        
                        <div className="FormFieldA">
                            <button onClick={this.handleSubmit} className="Form-Button">SUBMIT</button> 
                        </div>
                        
                    </form>
                 </div>
            </div>
     )}
  }
  
  export default Rating;
  



