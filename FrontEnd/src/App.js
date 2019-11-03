import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import WelcomePage from './pages/WelcomePage';
import RatingPage from './pages/RatingPage';
import NotFoundPage from './pages/404';
import feedBackPage from './pages/feedBackPage';

class App extends Component {
  render(){
  return  <Router >
        <Switch>
            <Route path='/' exact={true} component={ SignInForm } />
            <Route  exact path="/sign-in" component={ SignInForm } />     
            <Route  exact path="/sign-up" component={ SignUpForm } /> 
            <Route  exact path="/404" component={ NotFoundPage } />
            <Route  exact path="/welcomePage" component={ WelcomePage }/>    
            <Route  path="/ratingPage/:placeName" component={ RatingPage }/> 
            <Route  path="/feedBackPage" component={ feedBackPage }/> 
            <Redirect to='/404'></Redirect>
         </Switch>
    </Router>
  }
}

export default App;