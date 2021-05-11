import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import RestaurantsList from './RestaurantsList';
import HeaderComponent from './HeaderComponent'
import Restaurant from './Restaurant';
import RestaurantForm from './RestaurantForm';
import SignUp from './components/SignUp';
import Login from './components/Login';
import React, { Component } from 'react'
import UserService from './api/UserDataService'


export default class App extends Component {

  render(){
  return (
    <div className="">


      <Router>
        <HeaderComponent />
        <Switch>

          <Route path="/restaurants/:id/edit" component={RestaurantForm} />

          <Route path="/restaurants/:id" component={Restaurant} />

          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />

          <div className="outer">
          <div className="inner">
          <Route exact path="/SignUp" component={SignUp} />

          <Route exact path="/Login" component={Login} />
          </div>
          </div>

        </Switch>
      </Router>


    </div>
  );
  }
}
