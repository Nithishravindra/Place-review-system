import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

class App extends Component {
	// you can initialize state outside constructor different way
	constructor() {
		super();
		this.state = {
			placeTitle: "",
			description: "",
			// Created a new state with list of places which you can append to 
			listOfPlaces: [
				{
					title: 'GandiBazaar',
					description: 'Kadle KAi Pareshe'
				},
				{
					title: 'Jayanagar',
					description: 'As a newbie in React world, I came across a similar issues where I could not edit the textarea and struggled'
				}
			]
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		// you can add a name tag to html input element and access it using e.target.name
		this.setState({
		  [e.target.name]: e.target.value
		});
	  }
	
	  handleSubmit(e) {
		e.preventDefault();
		console.log('The form was submitted with the following data:');
		console.log(this.state);
		// I'm appending an object and pushing it to list
		this.setState(previousState => ({
			listOfPlaces: [...previousState.listOfPlaces, { title: this.state.placeTitle, description: this.state.description  }]
		}));
	  }

	componentDidMount() {
		// this does not make sense. what are you trying to achieve ? If you want to change some value save it in state
		document.title = 'Welcome to PRS';
	}

	render() {
		// You can use state values like this also
		const { placeTitle, description, listOfPlaces } = this.state;

		return (
			<div className="Ap">
				<div className="FormFieldB">
					<h4>Welcome to Place Review System</h4>
					{/* Removed li under p nesting - did not make sense */}
					<p>Places listed below can be reviewed.</p>
				</div>

				{/* URL Sector for navgiation to page3 */}
				<div className="FormFieldB">
					<div className="FormTitle">
						{
							listOfPlaces.map((item, index) => (
								<Link to={`/ratingPage/${item.title}`} key={index} className="FormTitle__Link">{item.title}</Link>
							))
						}
					</div>

					<div className="FormFieldB">
						<form onSubmit={this.handleSubmit}>
							{/* Removed li under p nesting - did not make sense */}
							<p>To add a new place in the list add title and description in below textbox and click on 'SUBMIT'</p> 
								
							<div className="FormFieldT">
								<input type="text" placeholder="Place Title" value={placeTitle} name="placeTitle" onChange={this.handleChange} />
							</div>
						 
							{/* changed value to default value - https://stackoverflow.com/questions/33245017/react-modifying-textarea-values */}
							<div className="FormFieldText">
                    			<textarea type="text" placeholder="Description" defaultValue={description} name="description" onChange={this.handleChange}/>
                			</div>    

							<button className="FormT_button" onClick={this.handleSubmit}>SUBMIT</button> 
						 </form>
					</div>
				</div>
			 </div>
		)
	}
}
export default App;
