import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { Component } from 'react'
import RestaurantDataService from './api/RestaurantDataService'

export default class RestaurantForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            restaurant: {}
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }


    // populate when the page is opened, with RESTAURANT JSON data
    componentDidMount() {
        if (this.state.id === -1) return

        RestaurantDataService.getRestaurantById(this.state.id)
            .then(response => this.setState({ restaurant: response.data }))
    }


    // Formik onSubmit Button
    onSubmit(values) {

        console.log(values)

        let restaurant = {
            restaurantId: this.state.id,
            restaurantName: values.restaurantName,
            city: values.city,
            state: values.state,
            streetAddress: values.streetAddress,
            description: values.description
        }

        // if ID == -1, this is a NEW restaurant to add
        if (this.state.id == -1) {
            RestaurantDataService.createRestaurant(restaurant)
                .then(() => this.props.history.push(`/restaurants`))
        }
        else {

            //This is an edit of existing restaurant
            RestaurantDataService.updateRestaurant(this.state.id, restaurant)
                .then(() => this.props.history.push(`/restaurants`))
        }

    }

    validate(values) {
        let errors = {}
        if (!values.restaurantName)
            errors.restaurantName = "Restaurant must have a name"
        if (!values.city)
            errors.city = "Input City"
        if (!values.state)
            errors.state = "Input State"
        if (!values.streetAddress)
            errors.streetAddress = "Input Address"
        if (!values.description)
            errors.streetAddress = "Input Description"

        return errors
    }

    render() {

        // IF this is EDIT, retrieve the initial values from Restaurant JSON
        // so we can populate the form
        let { restaurantName, city, state, streetAddress, description } = this.state.restaurant
        let displayRestaurantId = this.state.id

        return (
            <div className="container">
                <h1>{`Restaurant ID: ${displayRestaurantId == -1 ? 'NEW' : displayRestaurantId}`}</h1>

                <Formik
                    // Formik Form initial values
                    initialValues={{ restaurantName, city, state, streetAddress, description }}

                    // Click to submit --> Formik onSubmit
                    onSubmit={this.onSubmit}

                    // handle validation --> Formik validate
                    validateOnBlur={false}
                    validateOnChange={false}
                    validate={this.validate}

                    // allow the Formik form to get the state
                    enableReinitialize={true}
                >

                    {

                        (props) =>
                            <Form>
                                <ErrorMessage name="restaurantName" component="p" className="alert alert-warning" />
                                <ErrorMessage name="streetAddress" component="p" className="alert alert-warning" />
                                <ErrorMessage name="city" component="p" className="alert alert-warning" />
                                <ErrorMessage name="state" component="p" className="alert alert-warning" />
                                <ErrorMessage name="description" component="p" className="alert alert-warning" />

                                <fieldset className="form-group">
                                    <label>Restaurant Name</label>
                                    <Field className="form-control" type="text" name="restaurantName" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Street Address</label>
                                    <Field className="form-control" type="text" name="streetAddress" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>City</label>
                                    <Field className="form-control" type="text" name="city" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>State</label>
                                    <Field className="form-control" type="text" name="state" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description" />
                                </fieldset>

                                <button className="btn btn-primary" type="submit" name="submit">Submit</button>
                            </Form>
                    }
                </Formik>
            </div>
        )
    }
}
