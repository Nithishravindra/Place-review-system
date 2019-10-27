import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import WelcomePage from './pages/WelcomePage';
import RatingPage from './pages/RatingPage';
import NotFoundPage from './pages/404';

class App extends Component {
  render(){
  return  <Router >
        <Switch>
            <Route path='/' exact={true} component={SignInForm} />
            <Route  exact path="/sign-in" component={SignInForm}></Route>     
            <Route  exact path="/sign-up" component={SignUpForm}></Route> 
            <Route  exact path="/404" component={NotFoundPage}></Route>
            <Route  exact path="/welcomePage" component={WelcomePage}></Route>    
            <Route  path="/ratingPage/:placeName" component={RatingPage}></Route> 
            <Redirect to='/404'></Redirect>
         </Switch>
    </Router>
  }
}

export default App;