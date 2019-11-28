import React from 'react';
import { Component } from 'react';
import './feedBackPage.css';

class Feedback extends Component {
	constructor() {
		super();
		this.state = {
			feedback: '',
			radio1: 'Yes',
			errorMessage: '',
			userID: ""

		};
		this.handleChange = this.handleChange.bind(this);
	}

	Logout = (e) => {
		const cUserID = localStorage.getItem('userID');
		console.log('in feedbackPage ',cUserID)
		fetch(`http://localhost:3000/users/logout`, {
				method: "POST",
				body: JSON.stringify({
					userID: cUserID
				}),
				headers: {
					"content-type":"application/json",
					Accept: "application/json"
				}
			})
			.then(res => res.json())
			.then(response => {
				console.log(response)
					if(response.statusCode === 200){
						localStorage.removeItem('userID')
						alert(`Thank you!`)
						this.props.history.push(`/sign-in`)
					}
					else {
						this.setState({
							errorMessage: "AUTH failed"
						})
					}
			})  
	 }

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit = (e,feedback, radio1) =>   {
		e.preventDefault();
		if (feedback && feedback.length > 0 ) {
			const cUserID = localStorage.getItem('userID');
			fetch(`http://localhost:3000/feedback/add`, {
				method: "POST",
				body: JSON.stringify({
					feedback: this.state.feedback,
					radio: this.state.radio1,
					userID: cUserID
				}),
				headers: {
					"Content-type": "application/json",
					Accept: "application/json"
				}
			})
				.then(res => res.json())
				.then(response => {
					console.log(response);
				})
		} 
	}

	render() {
		const { feedback, radio1, errorMessage } = this.state;

		return (
			<div className="Ap">
				<div className="FormFieldB">

					<h3> was this site helpful?</h3>
					<form onSubmit={this.handleSubmit}>

						<div className="radio_feedback">
							<div className="radio_button">

								<input type="radio"
									name="radio1"
									value="Yes"
									checked={this.state.radio1 === "Yes"}
									onChange={this.handleChange} />
								<h5>YES</h5>
							</div>

							<div className="radio_button">
								<input type="radio"
									name="radio1"
									value="No"
									checked={this.state.radio1 === "No"}
									onChange={this.handleChange} />
								<h5>NO</h5>
							</div>
						</div>
						radio1: {this.state.radio1}

						<div className="FormFText">
							<textarea type="text"
								placeholder="provide your feedback here"
								defaultValue={feedback}
								name="feedback"
								onChange={this.handleChange} />
						</div>


						<div className="validation_feedbackPage">
							<h2 style={{ margin: 30 }}> {errorMessage}</h2>
							<button className="FormT_button"
								onClick={e => this.handleSubmit(e, feedback, radio1)}>
								SUBMIT</button>
						</div>

						<button className="FormT_button" onClick={this.Logout}>Logout</button>
					</form>
				</div>
			</div>
		)
	}
}
export default Feedback
