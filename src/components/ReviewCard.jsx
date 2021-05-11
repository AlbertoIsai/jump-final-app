import React, { Component } from "react";
import UserDataService from "../api/UserDataService"
import ReactStars from "react-rating-stars-component";

class ReviewCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameReview : ""
        };

    }

    componentDidMount() {
        UserDataService.getUsernameFromReviewId(this.props.data.reviewId)
            .then(
                response => {
                    this.setState({ usernameReview : response.data })
                }
            )
    }


    render() {
        return (
        <div className="col">
         <div className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page" key={this.props.key}>
                <ReactStars
                    count={5}
                    value = {this.props.data.stars}
                    size = {24}
                    edit = {false}
                    />
                <p className="mb-2">"{this.props.data.reviewBody}"</p>
                <p className="mb-4">- {this.state.usernameReview}</p>
            </div>
        </div>  
    )      
    }

} export default ReviewCard;