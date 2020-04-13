// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Text, Card, Image, Suggestion, Payload} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

   function options(agent) {
     const option = agent.parameters.option;
     
     if (option == "option1"){
     agent.add(new Payload(agent.SLACK,
                           {"text":  "Great! We have offerings in 3 focus industries. Which one would you like to Explore today?",
                           	"channel": "C061EG9SL",
                          	"attachments":[
                           {
      						"fallback": "Choose an appropriate option",
     						 "actions": [
        {
          "type": "button",
          "text": "Travel 🛫",
          "url": "https://www.niit-tech.com/industries/travel-transportation"
        },
                               {
          "type": "button",
          "text": "Banking and Financial Services💲",
          "url": "https://www.niit-tech.com/industries/banking-financial-services"
        },
                               {
          "type": "button",
          "text": "Insurance 📜",
          "url": "https://www.niit-tech.com/industries/insurance"
        }
      ]
    }
  ]}));
 }
     else if (option == "option2"){
     agent.add(new Payload(agent.SLACK,
                           {"text":  "Our subject matter experts constantly keep you abreast with tech trends and solve multiple implementation challenges in short bite sized content.\n What would you like to start with?",
                           	"channel": "C061EG9SL",
                          	"attachments":[
                           {
      						"fallback": "Choose an appropriate option",
     						 "actions": [
        {
          "type": "button",
          "text": "Whitepapers",
          "url": "https://www.niit-tech.com/knowledge-share/white-papers"
        },
                               {
          "type": "button",
          "text": "Point of Views",
          "url": "https://www.niit-tech.com/knowledge-share/thought-leadership"
        },
                               {
          "type": "button",
          "text": "Blogs",
          "url": "https://www.niit-tech.com/blog"
        },
                               
                               {
          "type": "button",
          "text": "Case Studies",
          "url": "https://www.niit-tech.com/knowledge-share/case-studies"
        },
                               
                               {
          "type": "button",
          "text": "Brochures",
          "url": "https://www.niit-tech.com/knowledge-share/brochures"
        }
                               
         
      ]
    },{
      						"fallback": "Choose an appropriate option",
     						 "actions": [
        {
          "type": "button",
          "text": "Data Sheet",
          "url": "https://www.niit-tech.com/knowledge-share/data-sheets"
        },
                               
                               {
          "type": "button",
          "text": "Analyst Report",
          "url": "https://www.niit-tech.com/knowledge-share/analyst-reports"
        },
                               
                               {
          "type": "button",
          "text": "Infographics",
          "url": "https://www.niit-tech.com/knowledge-share/infographics"
        },
                               
                               {
          "type": "button",
          "text": "Testimonials ",
          "url": "https://www.niit-tech.com/clients-speak"
        },
                               {
          "type": "button",
          "text": "Videos ",
          "url": "https://www.niit-tech.com/knowledge-share/videos"
        }
                               
         
      ]
    }
  ]}));
       
 }   else if (option == "option3"){
     agent.add(new Payload(agent.SLACK,
                           {"text":  "Great! What would you like to start with?",
                           	"channel": "C061EG9SL",
                          	"attachments":[
                           {
      						"fallback": "Choose an appropriate option",
     						 "actions": [
        {
          "type": "button",
          "text": "About NIIT Technologies ",
          "url": "https://www.niit-tech.com/about-us/vision-strategy"
        },
                               {
          "type": "button",
          "text": "News & Events  ",
          "url": "https://www.niit-tech.com/news-and-events/in-the-news"
        },
                               {
          "type": "button",
          "text": "Executive Leadership ",
          "url": "https://www.niit-tech.com/about-us/executive-leadership-team"
        }
      ]
    }
  ]
                           }));
 } else if (option == "option4"){
 agent.add(new Payload(agent.SLACK,{"attachments":[{
   "fallback": "Click the button below",
   "actions":[{"type": "button",
              "text":"Contact us",
              "url":"https://www.niit-tech.com/quick-connect"}
             ] 
 
 }]}));
 }
     else if (option == "option5"){
 agent.add(new Payload(agent.SLACK,{"text":"Write your suggestions below!",
                                   "channel": "C061EG9SL",
                                   }));
 
 }
     
   
   }
   function writetous(agent) {
    let text = agent.queryText;
    agent.add(new Payload(agent.SLACK,
                          {"text": text,
                          "channel": "C061EG9SL"}));
  }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('optionslevel', options);
  intentMap.set('writetous', writetous);
  
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
