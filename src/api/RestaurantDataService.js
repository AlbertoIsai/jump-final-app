import axios from "axios"
const API_URL = 'http://ec2-3-22-74-193.us-east-2.compute.amazonaws.com:5000' //<-- POINT TO BACKEND SERVER

class RestaurantDataService {

    getAllRestaurants() {
        return axios.get(`${API_URL}/restaurants`)
    }

    getRestaurantById(id) {
        return axios.get(`${API_URL}/restaurants/${id}`)
    }

    updateRestaurant(id, restaurant) {
        return axios.put(`${API_URL}/restaurants/${id}/edit`, restaurant)
    }

    createRestaurant(restaurant) {
        return axios.post(`${API_URL}/restaurants/-1/edit`, restaurant)
    }

    deleteRestaurant(id) {
        return axios.delete(`${API_URL}/restaurants/${id}/delete`)
    }

}
export default new RestaurantDataService()