import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            username : this.username,
            password : this.password
        }

        axios.post('http://ec2-3-22-74-193.us-east-2.compute.amazonaws.com:5000/authenticate', data).then(
            
        (response) => {

            localStorage.setItem('token', response.data.token);
            this.props.history.push('/');


        }).catch((err) => {

            console.log("Wrong Credentials");

        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter Username" onChange={e => this.username = e.target.value}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={e => this.password = e.target.value}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}