"use strict";

const https = require('https');

const YELP_SEARCH_URL = 'https://api.yelp.com/v3/businesses/search';
const YELP_API_KEY = '4aOa6gFFwXHW8EGz8gJf_pQ-FxIu99SLOpzHGv9Q9mU6STs4U7L7vOkVpMj4TkEUHRxCYNBTBBkVFYsLnrZ6_NtBgo5Hp2INnQN07UBft04jdUJ7QmJwG6XPMOKBXHYx';

// GLOBAL VARIABLE TO STORE RESULT OF YELP SEARCH
let yelpResult = {};

const searchYelp = async (queryString) => {
    return new Promise((resolve, reject) => {
        // OPTIONS FOR YELP
        const options = {
          hostname: 'api.yelp.com',
          json: true,
          path: encodeURI('/v3/businesses/search' + '?' + queryString),
          method: 'GET',
          headers: {
              Authorization: ` Bearer ${YELP_API_KEY}`
          }
        };

        // REQUEST MADE AND SAVES IT AS JSON
        const req = https.request(options, (res) => {
            const buffers = [];
            res.on('data', (chunk) => {
                buffers.push(chunk);
            });

            res.on('end', () => {
                yelpResult = JSON.parse(Buffer.concat(buffers).toString());
                return resolve();
            });
        });

        req.on('error', (err) => {
          reject(err.message);
        });

        req.end();
    });
}

// This function is to make parameters into url, which is to be used by searchYelp
const parseQueryString = (obj) => {
    let result = '';
    for (const key in obj) {
        result += `${key}=${obj[key]}&`;
    }
    result = result.slice(0, -1);
    return result;
}

exports.handler = async (event) => {

// Refer below for sampleObj format
// https://www.yelp.com/developers/documentation/v3/business_search

    if (event.currentIntent.name == "GreetingIntent") {
        return  {

        "dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
            "message": {
              "contentType": "PlainText",
              "content": "Hi there, how can I help?"
                },
            }
        }
    }

    if (event.currentIntent.name == "ThankYouIntent") {
        return {

        "dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
            "message": {
              "contentType": "PlainText",
              "content": "Sure, have a nice day!"
                },
            }
        }
    }
    const sampleObj = {
        // term: 'restaurant',
        location:  event.currentIntent.slots.City,
        limit: 5,
        categories: event.currentIntent.slots.Cuisine,
        // sort_by: 'rating'
    }
    const queryString = parseQueryString(sampleObj);
    await searchYelp(queryString);


    // yelpResult saves the result. It is set to object format now (JSON.parse).
    var msg = `Here are my ${event.currentIntent.slots.Cuisine} restaurant suggestions for ${event.currentIntent.slots.Number.toString()} people, 
    for ${event.currentIntent.slots.Date.toString()} at ${event.currentIntent.slots.Time.toString()} : `;
    var i = 0;
    for (i=0; i<4;i++) {
        const address = yelpResult.businesses[i].location.display_address[0];
        const restaurantName = yelpResult.businesses[i].name;
        msg = msg.concat(`${i+1}. ${restaurantName}, Located at ${address}. `)
    }
    msg = msg.concat("Enjoy your meal!")


    // yelpResult saves the result. It is set to object format now (JSON.parse).
    // return yelpResult;

    return {
  "sessionAttributes": {
      "City":  event.currentIntent.slots.City,
      "Date": event.currentIntent.slots.Date,
      "Time": event.currentIntent.slots.Time,
      "Cuisine": event.currentIntent.slots.Cuisine,
      "Number": event.currentIntent.slots.Number
    },
    "dialogAction": {
        "type": "Close",
        "fulfillmentState": "Fulfilled",
        "message": {
          "contentType": "PlainText",
          "content": msg
        },
     }
    }

}
