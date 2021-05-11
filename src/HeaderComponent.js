import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import UserService from './api/UserDataService'

class HeaderComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            restaurant: {},
            user : {userid: -1}
        }
        this.handleClickToAdd = this.handleClickToAdd.bind(this)
    }

    componentDidMount() {

        UserService.getUsernameFromToken()
        .then(
            response => {
                this.setState({user: response.data})
                console.log(response.data)
            },
            err => {
                console.log("Not Loged In")
            }
        )
    }


    // Click to Add Restaurant
    handleClickToAdd() {
        // id of -1 will trigger the add new condition in save() in java
        this.props.history.push(`/restaurants/-1/edit`)
    }


    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Welp!</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li><Link to="/" className="nav-link">All Restaurants</Link></li>

                            {this.state.user.admin ?
                            <li><Link to="/restaurants/-1/edit" className="nav-link"
                                onClick={() => this.handleClickToAdd}>Add A Restaurant</Link></li>
                                : '' }

                        </ul>
                        {this.state.user.userid == -1 ? 
                            <ul class="nav navbar-nav navbar-right">
                        
                            <li><Link to="/Login" className="nav-link">Login</Link></li>
                            <li><Link to="/SignUp" className="nav-link">Register</Link></li>
                            
                            </ul>
                        : 
                        <ul class="nav navbar-nav navbar-right">
                        
                        <li><Link to="/" className="nav-link">Welcome {this.state.user.username}</Link></li>
                        <li><Link to="/Login" onClick={() => localStorage.clear()} className="nav-link">Logout</Link></li>
                        
                        </ul>
                    
                        }

                    </div>
                </div>
            </nav>
        )
    }
}
export default withRouter(HeaderComponent)