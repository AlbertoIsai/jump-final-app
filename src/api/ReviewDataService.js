import axios from "axios"
const API_URL = 'http://ec2-3-22-74-193.us-east-2.compute.amazonaws.com:5000' //<-- POINT TO BACKEND SERVER

class ReviewDataService {

    createReview(review) {
        return axios.post(`${API_URL}/review/`, review)
    }

}
export default new ReviewDataService()