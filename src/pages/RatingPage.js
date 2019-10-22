import React, { Component } from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import './Rating.css';

class Rating extends Component {
        constructor() {
            super();
            this.state = {
                comment: '',
                rate1: '',
                
            };   
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleChange(e) {
            let target = e.target;
            let value = target.type === 'checkbox' ? target.checked : target.value;
            let name = target.name;
        
            this.setState ({
            [name]: value
            });
        }

        handleSubmit(e) {
            console.log(e.Rating);
            e.preventDefault();
            console.log('Rating completed ... ');
            console.log(this.state);
        }
   
        handle(e) {
            console.log(e.rating);
        }

        render(){
            var a = window.location.href;
            let b = a.split;
            console.log('b', b);
        
        return (  
            <div className="Appp">
                {/* PARSE URL AND APPEND IN H1 TAG  */}

                <div className="FormFieldA">
                        <h1>(Place Title)</h1>
                </div>`
                
                {/* description to be retrived from db */}
                <div className="FormFieldText">
                    <textarea type="text" placeholder=" Description(Optional)" />
                </div>    
                
                {/* avg from db */}
                <div className="FormFieldQ">
                    <div className="FormFieldHead">
                        <h2> <li> Average Rating by others  </li> </h2>
                    </div>
                    <div className="Rater-icon1">    
                        <Rater onRate={this.handle} />
                    </div>
                    {/* <textarea type="text" placeholder="earlier comments to be displayed" /> */}
                </div>
                        
                <div className="FormCenter">
                    <form onSubmit={this.handleSubmit} className="FormFields">
                        
                        
                        <div className="FormFieldA">
                            <div className="FormFieldHead">
                                <h2> <li>Overall rating of the Place </li> </h2>
                            </div>
                            <div className="Rater-icon">    
                                    <Rater onRate={this.handle} />
                            </div>
                        </div>
                        
                        <div className="FormFieldA">
                            <div className="FormFieldHead">
                            <h2> <li> Recommend others on scale of 5 </li> </h2>
                            </div>
                            <div className="Rater-icon">    
                                    <Rater onRate={this.handle} />
                            </div>
                        </div>
                        
                        <div className="FormFieldA">
                            <textarea className="comment" placeholder="Enter your comment " name="message" rows="5"></textarea>
                            <br />
                        </div>
                        
                        <div className="FormFieldA">
                            <button onClick={()=>{alert('Thank you for feedback')}}className="Form-Button">SUBMIT</button> 
                        </div>
                        
                    </form>
                 </div>
            </div>
     )}
  }
  
  export default Rating;
  



