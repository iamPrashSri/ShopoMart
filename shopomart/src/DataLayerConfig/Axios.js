import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:5001/shopomart-1b22e/us-central1/api'      /* The API (cloud function URL) */
});

export default Axios;