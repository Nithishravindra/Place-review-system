import React from 'react';
import { Component } from 'react';
 import  './feedBackPage.css';


 class Feedback extends Component {
	constructor() {
		super();
		this.state = {
            feedback: " ",	
            
            previousFeedback: [
				{
					
					feedback: 'Kadle KAi Pareshe'
				},
				{
					
					feedback: 'As a newbie in React world, I came across a similar issues where I could not edit the textarea and struggled'
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
        const { feedback, previousFeedback } = this.state;
		return (
			<div className="Ap">
				
				<div className="FormFieldB">
				   <form onSubmit={this.handleSubmit}>
					    <h3> was this website helpful?</h3>	
                        
                            <div className="ov">
                                <h3> yes </h3>
                                <div className="check">
                                    <input type="checkbox" />
                                </div>
                            </div>
                            
                            <div className="ov">
                                <h3> no </h3>
                                <div className="check">
                                    <input type="checkbox" />
                                </div>
                            </div>

                            <div className="FormFText">
                    			<textarea type="text" placeholder="provide your feedback here"  defaultvalue={feedback} name="description" onChange={this.handleChange}/>
                			</div>  

                            <button className="FormT_button" onClick={this.handleSubmit}>SUBMIT</button> 
					</form>
					
				</div>
			 </div>
		)
	}
}
export default Feedback
