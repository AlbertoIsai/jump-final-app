import React, { Component } from "react";
import UserDataService from "../api/UserDataService"
import ReactStars from "react-rating-stars-component";
import ReviewDataService from "../api/ReviewDataService"

class ReviewForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formStars : 5,
            user : {}
        };
    }

    handleSubmit = e => {

        const data = {
            "restaurantId": this.props.data.restaurant.restaurantId,
            "userId": this.props.data.user.userId,
            "reviewBody": this.reviewBody,
            "stars": this.state.formStars
        }

        ReviewDataService.createReview(data).then(
        (response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() {
        UserDataService.getUsernameFromToken()
        .then(
            response => {
                this.setState({user: response.data})
            },
            err => {
            }
        )
    }


    render() {

        const ratingChanged = (newRating) => {
            this.setState({ formStars: newRating })
          };
        return (
            <div class="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page">
            <h5 class="mb-4">Leave Comment</h5>
            <p class="mb-2">Rate the Place</p>
            <ReactStars
            count={5}
            size = {24}
            onChange={ratingChanged}
            />
            <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                    <label>Your Comment</label>
                    <input type="text" className="form-control" placeholder="Comment Here" onChange={e => this.reviewBody = e.target.value}/>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-sm" type="submit"> Submit Comment </button>
                </div>
            </form>
            </div>
    )      
    }

} export default ReviewForm;