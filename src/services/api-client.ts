import axios from "axios";
export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: '80f0ddf4cee348fc8cf60223e55b8b3a'
    }
})