import axios from "axios";
export default axios.create({
    baseURL: `https://us-central1-cnd-play.cloudfunctions.net/`
});