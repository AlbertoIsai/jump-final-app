import axios from "axios"
const API_URL = 'http://ec2-3-22-74-193.us-east-2.compute.amazonaws.com:5000' //<-- POINT TO BACKEND SERVER

class UserDataService {

    getAllUsers() {
        return axios.get(`${API_URL}/users`)
    }

    getUsernameFromReviewId(reviewId) {
        return axios.get(`${API_URL}/user/review/${reviewId}`)
    }

    getUsernameFromToken(){
        return axios.get(`${API_URL}/getuser`)
    }

}
export default new UserDataService()