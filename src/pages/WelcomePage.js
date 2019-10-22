import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';


class App extends Component {
	constructor() {
		super();
		this.state = {
			placeTitle: "",
			description: "" 
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		let target = e.target;
		let value = target.type === 'checkbox' ? target.checked : target.value;
		let name = target.name;
		this.setState({
		  [name]: value
		});
	  }
	
	  handleSubmit(e) {
		e.preventDefault();
		console.log('The form was submitted with the following data:');
		console.log(this.state);
	  }

	componentDidMount() {
		document.title = 'Welcome to PRS';
	}

	render() {
		return (
			<div className="Ap">
				{this.componentDidMount()}

				<div className="FormFieldB">
					<h4>Welcome to Place Review System</h4>
					<p><li>Places listed below can be reviewed.</li></p>
				</div>

				{/* URL Sector for navgiation to page3 */}
				
				<div className="FormFieldB">
					
					<div className="FormTitle">
						<Link to={`/ratingPage/${"PLACE1"}`} className="FormTitle__Link">PLACE 1</Link>
						<Link to={`/ratingPage/${"PLACE2"}`} className="FormTitle__Link">PLACE 2</Link>
						
					</div>

					<div className="FormFieldB">
						<form onSubmit={this.handleSubmit}>
							
							<p><li>To add a new place in the list add title and description in below textbox and click on 'SUBMIT'. </li></p> 
								
							 	<div className="FormFieldT">
									<input type="text" placeholder="Place Title" value={this.state.name} onChange={this.handleNameChange} />
								</div>
						 
								<div className="FormFieldText">
                    				<textarea type="text" placeholder=" Description" value={this.state.description} onChange={this.handleNameChange}/>
                				</div>    

								<button className="FormT_button">SUBMIT</button> 
							
						 </form>
						
					</div>
				</div>
			 </div>

		)
	}
}
export default App;
