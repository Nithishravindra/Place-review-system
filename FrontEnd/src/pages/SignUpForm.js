import React, { Component } from 'react';
import { Link, Route, NavLink } from 'react-router-dom';
import WelcomePage from './WelcomePage';

class SignUpForm extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			phone: '',
			password: '',
			conpassword: '',

		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		// let target = e.target;
		// let value = e.target.value;
		// let name = target.name;
		
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		console.log('The form was submitted with the following data:');
		console.log(this.state);

		const data = { name: this.state.name, email:this.state.email, phone: this.state.phno, password:this.state.password}
		fetch('http://localhost/3005/users/add', { 
			method: 'POST', 
			body: JSON.stringify(data),
			headers:{ 'Content-Type': 'application/json' } })
			.then( res => res.json())
			.catch(err => console.log('error == ' , err))  
			.then(response => console.log('inserted ', response));
		}
	
	componentDidMount() {
		document.title = 'PRS log in or sign up';
		// const url = 'http://localhost/:3005/users';
    	// fetch(url)
      	// 	.then(results =>{
		// 		  return results.json();
		// 	  })
	
		// const options = {
		// 	method: 'POST',

		// }
		// const request = new Request('http://localhost/:3005/user', options)
	}

	render() {
		return (
			<div className="FormCenter">
				{this.componentDidMount()}

				<div className="App-header"><h1>Place Review System</h1></div>
				<div className="FormTitle">
					<Link to="/sign-in"  className="FormTitle__Link">Sign In </Link>  or
                    <Link to="/sign-up"  className="FormTitle__Link"> Sign Up</Link>
				</div>
				<div className="PageSwitcher">
					<NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
					<NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
				</div>

				<form onSubmit={this.handleSubmit} className="FormFields">

					<div className="FormField">
						<label className="FormField__Label" htmlFor="name">Name</label>
						<input type="text" id="name" className="FormField__Input" placeholder="Enter your name" name="name" value={this.state.name} onChange={this.handleChange} />
					</div>

					<div className="FormField">
						<label className="FormField__Label" htmlFor="email">Email Address</label>
						<input type="email" id="email" className="FormField__Input" placeholder="Enter your Email" name="email" value={this.state.email} onChange={this.handleChange} />
					</div>					

					<div className="FormField">
						<label className="FormField__Label" htmlFor="password">Password</label>
						<input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
					</div>

					<div className="FormField">
						<label className="FormField__Label" htmlFor="conpassword">Confirm Password</label>
						<input type="password" id="conpassword" className="FormField__Input" placeholder="Re-enter your password" name="conpassword" value={this.state.conpassword} onChange={this.handleChange} />
					</div>

					<div className="FormField">
						<label className="FormField__Label" htmlFor="phno">Phone no</label>
						<input type="text" id="phoneno" className="FormField__Input" placeholder="Enter your phone no" name="phone" value={this.state.phone} onChange={this.handleChange} />
					</div>

					<div className="FormField">
						<Link to="/welcomePage"><button onClick={() => { alert('Registered successful')}} className="FormField__Button mr-20">Sign Up</button> </Link>
						<Link to="/sign-up" className="FormField__Link">I'm already member</Link>
					</div>

					<Route excat path="/welcomePage" component={WelcomePage} />
				</form>
			</div>
		);
	}
}

export default SignUpForm;
