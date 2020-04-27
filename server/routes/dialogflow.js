const express = require('express');
const path = require('path')
const router = express.Router();
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const config = require('../config/keys');
const projectId = config.googleProjectID
const sessionId = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode

const sessionClient = new dialogflow.SessionsClient({keyFilename: path.join(__dirname, "../../test-chat-bot-app-275514-7146286b9011.json")});
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

//text query routes
router.post('/textQuery', async(req, res) => {
  //send information from the client to dialogflow API
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body.text,
        // The language used by the client (en-US)
        languageCode: languageCode,
      },
    },
  };
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);

  res.send(result);


});

module.exports = router;
