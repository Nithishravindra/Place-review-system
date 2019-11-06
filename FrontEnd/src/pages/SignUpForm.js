import React, { Component } from 'react';
import { Link, Route, NavLink } from 'react-router-dom';
import WelcomePage from './WelcomePage';

class SignUpForm extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			conpassword: '',
			phno:'',
			errorMessage: ''

		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		let target = e.target;
		let value = target.type === 'checkbox' ? target.checked : target.value;
		let name = target.name;
		
		this.setState({
		  [name]: value
		});
	}

	componentDidMount() {
		document.title = 'PRS log in or sign up';
	}

	newUser(e,name,email,password,conpassword,phno){
		e.preventDefault();
		if(this.state.name.length>0 && this.state.email.length > 0 && this.state.password.length>0) {
			if(this.state.phno.length === 10){
				if(this.state.password === this.state.conpassword){
				console.log(name,email,password,conpassword,phno);
				fetch(`http://localhost:3000/users/add`, {
					method: "POST",
					 body: JSON.stringify({
						name: this.state.name,
						email: this.state.email,
						password: this.state.password,
						phno: this.state.phno
					}),
					headers: {
						"Content-type": "application/json",
						Accept: "application/json"
					}
				})
					.then(res => res.json())
					.then(data => {
						console.log(data);
					})	
					alert('Registered successfully')
				} else {
				this.setState({
					errorMessage: "Password did not match"
				})}
			}else {
				this.setState({
					errorMessage: "Invalid phone number"
				})
			}
		} else {
			this.setState({
                errorMessage: "Please enter valid details"
            });
		}
	}

	render() {

		const { name, email, password, conpassword, phno, errorMessage} = this.state;
		
		
		return (
			<div className="FormCenter">
				{/* //{this.componentDidMount()} */}

				<div className="App-header">
					<h1>Place Review System</h1>
				</div>

				<div className="FormTitle">
					<Link to="/sign-in"  className="FormTitle__Link">LOGIN </Link>  or
                    <Link to="/sign-up"  className="FormTitle__Link"> REGISTER</Link>
				</div>

				<div className="PageSwitcher">
					<NavLink to="/sign-in" 
					activeClassName="PageSwitcher__Item--Active" 
					className="PageSwitcher__Item">LOGIN
					</NavLink>
	
					<NavLink to="/sign-up" 
					activeClassName="PageSwitcher__Item--Active" 
					className="PageSwitcher__Item">REGISTER
					</NavLink>
				</div>

				<form onSubmit={this.handleSubmit} className="FormFields">

					<div className="FormField">
						<label className="FormField__Label" htmlFor="name">Name</label>
						<input type="text" 
						id="name" 
						className="FormField__Input" 
						placeholder="Enter your name" 
						name="name" 
						value={name} 
						onChange={this.handleChange} />
					</div>

					<div className="FormField">
						<label className="FormField__Label" htmlFor="email">Email Address</label>
						<input type="email" 
						id="email"
						className="FormField__Input"
						 placeholder="Enter your Email" 
						 name="email" 
						 value={email} 
						 onChange={this.handleChange} />
					</div>					

					<div className="FormField">
						<label className="FormField__Label" htmlFor="password">Password</label>
						<input type="password" 
						id="password" 
						className="FormField__Input" 
						placeholder="Enter your password" 
						name="password" 
						value={password} 
						onChange={this.handleChange} />
					</div>

					<div className="FormField">
						<label className="FormField__Label" htmlFor="conpassword">Confirm Password</label>
						<input type="password" 
						id="conpassword" 
						className="FormField__Input" 
						placeholder="Re-enter your password" 
						name="conpassword" 
						value={conpassword}
						onChange={this.handleChange} />
					</div>

					<div className="FormField">
						<label className="FormField__Label" htmlFor="phno">Phone no</label>
						<input type="number" 
						pattern="[0-9]*"	
						id="number" 
						className="FormField__Input" 
						placeholder="Enter your phone no" 
						name="phno" 
						value={phno}
						onChange={this.handleChange} />
					</div>

					<div className="FormField">
							<Link to="/welcomePage">	
							<h2 style={{ color: "white", margin:20 }}>
							{errorMessage} 
							</h2>
							<button 
							onClick={e => this.newUser(e,name,email,password,conpassword,phno)}
							className="FormField__Button mr-20"> REGISTER
							</button> 
							</Link>
						
					</div>
					
					<Route excat path="/welcomePage" component={WelcomePage} />
				</form>
			</div>
		);
	}
}

export default SignUpForm;
