import axios from "axios";
import apiKey from '../../config/api-key.json'
export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: apiKey
    }
})