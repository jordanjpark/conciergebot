"use strict";

const AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';
const lexruntime = new AWS.LexRuntime();

let messageForLex;

const sendToLex = async (event) => {
    messageForLex = mapMessageToLex(event);
    const result = await lexPromise();
    return { res: { message: result.message } };
}

const lexPromise = async () => {
    return new Promise((resolve, reject) => {
        lexruntime.postText(messageForLex, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

const mapMessageToLex = (message) => {
    return {
        botAlias: 'zhijilex',
        botName: 'chatbot',
        inputText: message,
        userId: 'test1234',
        sessionAttributes: {}
    }
}

const done = ({err, res}) => {
    return {
        statusCode: '200',
        body: err ? err : res.message,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}

exports.handler = async (event) => {
    const response = await sendToLex(event.body);
    return done(response);
}
