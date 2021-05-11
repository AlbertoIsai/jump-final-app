import React, { Component } from 'react'
import RestaurantDataService from './api/RestaurantDataService'
import UserService from './api/UserDataService'
import ReactStars from "react-rating-stars-component";

export default class RestaurantsList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            search: '',
            restaurants: [],
            user: {}
        }

        this.updateSearch = this.updateSearch.bind(this)
        this.handleClickToRestaurant = this.handleClickToRestaurant.bind(this)
        this.handleClickToEdit = this.handleClickToEdit.bind(this)
    }

    componentDidMount() {

        // INITIAL STATE WHEN PAGE OPEN --> GET ALL RESTAURANTS
        RestaurantDataService.getAllRestaurants()
            .then(
                response => {
                    this.setState({ restaurants: response.data })
                }
            )
            UserService.getUsernameFromToken()
            .then(
                response => {
                    this.setState({user: response.data})
                    console.log(this.state.user.username)
                },
                err => {
                    console.log("Not Loged In")
                }
            )
    }

    // Search
    updateSearch(event) {
        this.setState({ search: event.target.value })
    }

    // Click to Restaurant Page
    handleClickToRestaurant(id) {
        this.props.history.push(`/restaurants/${id}`)
    }

    // Click to Edit Restaurant
    handleClickToEdit(id) {
        this.props.history.push(`/restaurants/${id}/edit`)
    }

    // Click to Edit Restaurant
    handleClickToDelete(id) {
        RestaurantDataService.deleteRestaurant(id)
        window.location.reload();
    }



    render() {

        let searchResult = this.state.restaurants.filter(
            (foundRestaurant) => {
                return foundRestaurant.restaurantName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        )
          

        return (


            <div className="container">
                <h1 className="display-3 text-center">All Restaurants</h1>


                <div className="form-group" style={{ width: "60%", margin: "0pt auto 20pt" }}>
                    <input type="text" id="search" className="form-control form-control-lg" placeholder="Search By Name"
                        value={this.state.search} onChange={this.updateSearch} />
                </div>


                <div className="row row-cols-1 row-cols-md-3 g-3">
                    {searchResult.map(

                        (restaurant) =>
                            <div className="col">

                                <div className="card shadow m-2" key={restaurant.restaurantId}>


                                    <div className="card-body pb-5">
                                       

                                        <a href="" className=" h3 link-primary text-decoration-none"
                                            onClick={() => this.handleClickToRestaurant(restaurant.restaurantId)}>{restaurant.restaurantName}</a>
                                        <p></p>
                                        <p className="card-text">{restaurant.streetAddress}</p>
                                        <p className="card-text">{restaurant.city}, {restaurant.state}</p>

                                        <div>
                                        <p className="card-text">{restaurant.reviews ? 
                                        <ReactStars
                                        count={5}
                                        value = {restaurant.stars}
                                        size = {24}
                                        edit = {false}
                                        /> 
                                        : ' No Reviews'} ({restaurant.reviews.length})</p>
                                        </div>


                                    </div>


                                     {this.state.user.admin ? 
                                    <div className="card-footer d-flex justify-content-end">
                                        <button className="btn btn-success"
                                            onClick={() => this.handleClickToEdit(restaurant.restaurantId)}>Edit</button>
                                            <button className="btn btn-error"
                                        onClick={() => this.handleClickToDelete(restaurant.restaurantId)}>Delete</button>
                                    </div>
                                    : ''}


                                </div>
                            </div>
                    )}
                </div>
            </div >
        )
    }
}