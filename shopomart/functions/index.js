const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Hv5opKowoFdwyoNxa8VZtn8znM069A52twJrhhynprCe2d7SQ7MowAryRpIwpwqvrr0dqnPDQeBs9b5ujgyKmE3007KW0ZdYv');

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get('/', (request, response) => response.status(200).send('Hello World'));

app.post('/payments/create', async (request, response) => {
    let total = request.query.total;
    let paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd'
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    });
});

// Listen
exports.api = functions.https.onRequest(app);

// http://localhost:5001/shopomart-1b22e/us-central1/api
// This is a sample api endpoint generated by firebase emulators:start command