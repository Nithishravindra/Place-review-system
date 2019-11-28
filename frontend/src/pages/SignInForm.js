import React, { Component } from 'react';
import { Link, Route, NavLink } from 'react-router-dom';
import WelcomePage from './WelcomePage';


class SignInForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e, email, password) {
    e.preventDefault();

    if (email.length > 0 && password.length > 0) {
      fetch(`http://localhost:3000/users/login`, {
        method: "POST",
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        }),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        }
      })
        .then(res => res.json())
        .then(response => {
          if (response.statusCode === 200) {
            localStorage.setItem('userID', response.Message)
            this.props.history.push(`/welcomePage`)
          }
          if (response.statusCode === 401) {
            this.setState({
              errorMessage: "Invalid Details"
            })
          }
        })

    } else {
      this.setState({
        errorMessage: "Please enter email/password"
      })
    }

  }

  componentDidMount() {
    document.title = 'PRS log in or sign up';
  }


  render() {
    const { email, password, errorMessage } = this.state;


    return (
      <div className="FormCenter">
        {this.componentDidMount()}
        <div className="App-header"><h1>Place Review System</h1></div>

        <div className="PageSwitcher">
          <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Login</NavLink>
          <NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Register</NavLink>
        </div>

        <form onSubmit={this.handleSubmit} className="FormFields">

          <div className="FormField">
            <label className="FormField__Label" htmlFor="email">Email Address</label>
            <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">Password</label>
            <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
          </div>

          <div className="FormField">

            <h2 style={{ margin: 30 }}> {errorMessage}</h2>
            <button onClick={e => this.handleSubmit(e, email, password)} className="FormField__Button mr-20"> Login</button>
            <Link to="/welcomePage"></Link>
            <p3> < br/>  < br /> Create an account</p3>
            
            <Link to="/sign-up" className="FormTitle__Link"> 
              <button  className="FormButtton"> Register</button>
            </Link> 
             
          </div>

          <Route exact path="/welcomePage" component={WelcomePage} />

        </form>
      </div>
    );
  }
}

export default SignInForm;
