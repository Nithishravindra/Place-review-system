import React from 'react';
import { Component } from 'react';
 import  './feedBackPage.css';


 class Feedback extends Component {
	constructor() {
		super();
		this.state = {
            feedback: " ",	
            
            
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
        this.setState()
        alert('thanks for your feedback');
	}
    
	render() {
        const  feedback  = this.state;
		return (
			<div className="Ap">
				<div className="FormFieldB">
				   <form onSubmit={this.handleSubmit}>
					    <h3> was this site helpful?</h3>	
                        
						<div className="radio_feedback">
                            <div className="radio_button">
							<input type="radio" name="radio1" onChange={this.handleChange} />							
								<h5>YES</h5>
							</div>
							
							<div className="radio_button">
							<input type="radio" name="radio1" onChange={this.handleChange}/> 
								<h5>NO</h5>
                            </div>
						
						</div>

                            <div className="FormFText">
                    			<textarea type="text" placeholder="provide your feedback here" defaultValue={feedback} onChange={this.handleChange}/>
                			</div>  
                            <button className="FormT_button" onClick={this.handleSubmit}>SUBMIT</button> 
					</form>
				</div>
			 </div>
		)
	}
}
export default Feedback
