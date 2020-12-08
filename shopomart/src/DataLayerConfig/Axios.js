import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://us-central1-shopomart-1b22e.cloudfunctions.net/api' // API from Firebase
    // After firebase deploy --only functions
    
    // 'http://localhost:5001/shopomart-1b22e/us-central1/api'      /* The API (cloud function URL) */
});

export default Axios;