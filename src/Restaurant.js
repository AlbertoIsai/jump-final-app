import React, { Component } from 'react'
import RestaurantDataService from './api/RestaurantDataService'
import UserDataService from './api/UserDataService'
import ReviewCard from './components/ReviewCard.jsx'
import ReviewForm from './components/ReviewForm.jsx'
import ReactStars from "react-rating-stars-component";
import UserService from './api/UserDataService';

export default class Restaurant extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            restaurant: {
                reviews : []
            },
            user : { userid: -1}
        }
    }

    // populate when the page is opened, with RESTAURANT JSON data
    componentDidMount() {
        if (this.state.id === -1) return

        RestaurantDataService.getRestaurantById(this.state.id)
            .then(response => this.setState({ restaurant: response.data }))

            UserService.getUsernameFromToken()
            .then(
                response => {
                    this.setState({user: response.data})
                },
                err => {
                }
            )


    }

    render() {
        return (
            <div className="container">
                <h1 className="display-4">{this.state.restaurant.restaurantName}</h1>
                <p className="lead">{this.state.restaurant.streetAddress}</p>
                <p className="lead">{this.state.restaurant.city}, {this.state.restaurant.state}</p>
                <hr className="my-4"></hr>
                <p className="lead">{this.state.restaurant.description}</p>

                {this.state.restaurant.reviews.map(
                    (review, index) =>
                        <ReviewCard key={review.id} data={review}/>
                    )}


                    {this.state.user.userid != -1 ? 
                        <ReviewForm key={"ReviewForm"} data={this.state}/>
                    : ''}
            </div>




        )
    }
}