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
            
            };   

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleChange(e) {
          
            this.setState ({
            [e.target.rate1]: e.target.value
            });
        }

        // handle(e) {
        //     console.log(e.rating);
        //    this.setState(previousState => ({
        //      rate1: [...previousState.rate1, { rate1: this.state.rate1 }]
        //    }))
        // }

        handleSubmit(e) {
            e.preventDefault();
            // console.log(e.Rating);
           
            // this.setState(previousState => ({
            //     comment: [...previousState.comment, { comment: this.state.comment }]
            // }))
        }
   
       
        componentDidMount () {
            // const { hand } = this.props.match.params;
            // const { state } = this.props.state

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
                
                {/* description to be retrived from db */}

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
                                <h2>Your rating</h2>
                            </div>
                            <div className="Rater-icon">    
                                 <Rater onRate={this.handleChange} name="rate1" />
                            </div>
                        </div>
                        
                        <div className="FormFieldA">
                            <textarea type="text" placeholder = "Enter your comment" defaultValue = { comment } name= "comment" onChange={this.handleChange}/>
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
  



