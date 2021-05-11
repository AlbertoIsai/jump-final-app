import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router';


export default class SignUp extends Component {

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            username : this.username,
            password : this.password
        }
        console.log(data)

        axios.post('http://ec2-3-22-74-193.us-east-2.compute.amazonaws.com:5000/register', data).then(
            
        (response) => {

            this.props.history.push('/');

        }).catch((err) => {

            console.log(err);

        })
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" onChange={e => this.username = e.target.value}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={e => this.password = e.target.value}/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">log in?</a>
                </p>
            </form>
        );
    }
}