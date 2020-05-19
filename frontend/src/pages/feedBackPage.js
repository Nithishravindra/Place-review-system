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
		fetch(`http://localhost:3000/users/logout`, {
			method: "POST",
			body: JSON.stringify({
				userID: cUserID
			}),
			headers: {
				"content-type": "application/json",
				Accept: "application/json"
			}
		})
			.then(res => res.json())
			.then(response => {
				console.log(response)
				if (response.statusCode === 200) {
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

	handleSubmit = (e) => {
		e.preventDefault();

		if (this.state.feedback && this.state.feedback.length > 0) {
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
		const { feedback, errorMessage } = this.state;
		return (
			<div className="A">
				<div className="FormFieldB">

					<h3>Was this site helpful?</h3>
					<form onSubmit={this.handleSubmit}>
						<div className="radio_button">
							<div className="buttonLogout">
								<button className="feedbackBtn" onClick={this.Logout}>Logout</button>
							</div>
							<ul>
								<li>
									<label>
										<input type="radio"
											name="radio1"
											value="Yes"
											checked={this.state.radio1 === "Yes"}
											onChange={this.handleChange} />
											YES
									</label>
								</li>
								<li>
									<label>
										<input type="radio"
											name="radio1"
											value="No"
											checked={this.state.radio1 === "No"}
											onChange={this.handleChange} />
											NO
									</label> 
								</li>
							</ul>
		
						</div>
							<div className="FormFText">
								<textarea type="text"
									placeholder="provide your feedback here"
									defaultValue={feedback}
									name="feedback"
									onChange={this.handleChange} />
							</div>

						<div className="validation_feedbackPage">
								<h2 style={{ margin: 30 }}> {errorMessage}</h2>
								<button className="FormT_button">SUBMIT</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}
export default Feedback
