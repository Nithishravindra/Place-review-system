import React from 'react';
import { Component } from 'react';
 import  './feedBackPage.css';


 class Feedback extends Component {
	constructor() {
		super();
		this.state = {
			radio: '',
            feedback: " ",	
            
            previousFeedback: [
				{
					
					feedback: 'neeed to work more '
				},
				{
					
					feedback: 'amazing...'
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
	
	handleSubmit(e) {
        e.preventDefault();
        this.setState(previousState => ({
		    previousFeedback: [...previousState.previousFeedback, { feedback: this.state.feedback }]
		}));
        alert('thanks for your feedback');
	}
    
	render() {
        const { feedback } = this.state;
		return (
			<div className="Ap">
				<div className="FormFieldB">
				   <form onSubmit={this.handleSubmit}>
					    <h3> was this site helpful?</h3>	
                        
                            <div className="radio_button">
								
                                    <input type="radio" name = "radio1" onChange={this.handleChange} /> YES	<br />								
									<input type="radio" name = "radio1" onChange={this.handleChange}/> NO 
                            </div>
                        
                            <div className="FormFText">
                    			<textarea type="text" placeholder="provide your feedback here"  onChange={this.handleChange}/>
                			</div>  
																{/* handlesubmit ->  beg/end*/}
                            <button className="FormT_button" onClick={this.handleSubmit}>SUBMIT</button> 
					</form>
				</div>
			 </div>
		)
	}
}
export default Feedback
