const express = require('express'),
      path = require('path'),
      router = express.Router(),
      dialogflow = require('dialogflow'),
      uuid = require('uuid'),
      config = require('../config/keys'),
      projectId = config.googleProjectID,
      sessionId = config.dialogFlowSessionID,
      languageCode = config.dialogFlowSessionLanguageCode

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


router.post('/eventQuery', async (req, res)=>{
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        // The query to send to the dialogflow agent
        name: req.body.event,
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

})

module.exports = router;
