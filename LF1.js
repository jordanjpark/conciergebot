

// //API key: 4aOa6gFFwXHW8EGz8gJf_pQ-FxIu99SLOpzHGv9Q9mU6STs4U7L7vOkVpMj4TkEUHRxCYNBTBBkVFYsLnrZ6_NtBgo5Hp2INnQN07UBft04jdUJ7QmJwG6XPMOKBXHYx
// // Client ID: Zo-KxzevNyD_drGWRvgcOg
// const apiKey = "4aOa6gFFwXHW8EGz8gJf_pQ-FxIu99SLOpzHGv9Q9mU6STs4U7L7vOkVpMj4TkEUHRxCYNBTBBkVFYsLnrZ6_NtBgo5Hp2INnQN07UBft04jdUJ7QmJwG6XPMOKBXHYx";

// const yelp = require('yelp-fusion');
// const client = yelp.client(apiKey);



exports.handler = async (event) => {
    // TODO implement
    console.log(event);

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

    // client.search({
    //   term:'restuarant',
    //   location: event.currentIntent.slots.City,
    //   categories: event.currentIntent.slots.Cuisine,
    //   open_at: event.currentIntent.slots.Time,
    //   sort_by:"rating",
    //   limit: 1
    // }).then(response => {
    //   console.log(response.jsonBody.businesses[0].name);
    // }).catch(e => {
    //   console.log(e);
    // });

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
           "content": "Your city is " + event.currentIntent.slots.City + " with a party of " + event.currentIntent.slots.Number +
           " at " + event.currentIntent.slots.Date + " " + event.currentIntent.slots.Date
           + " and you would like " + event.currentIntent.slots.Cuisine
        },
     }
    }

};
