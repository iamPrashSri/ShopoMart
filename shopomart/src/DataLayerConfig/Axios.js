import axios from 'axios'

const Axios = axios.create({
    baseURL: '...'      /* The API (cloud function URL) */
});

export default Axios;