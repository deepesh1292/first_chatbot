var $messages = $('.messages-content');
var serverResponse = "wala";


var suggession;
//speech reco
try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
}

$('#start-record-btn').on('click', function(e) {
  recognition.start();
});

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
 document.getElementById("MSG").value= speechToText;
  //console.log(speechToText)
  insertMessage()
}


function listendom(no){
  console.log(no)
  //console.log(document.getElementById(no))
document.getElementById("MSG").value= no.innerHTML;
  insertMessage();
}

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    serverMessage("Hello, Welcome to our Company Website.  How can I help you? ","");
  }, 100);

});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}



function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  fetchmsg() 
  
  $('.message-input').val(null);
  updateScrollbar();

}

document.getElementById("mymsg").onsubmit = (e)=>{
  e.preventDefault() 
  insertMessage();
  
}

function serverMessage(response2,suggession) {


  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new serverMessage"><figure class="avatar"><img src="css/bot.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();
  

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new serverMessage"><figure class="avatar"><img src="css/bot.png" /></figure><label>' + response2+'</label></div>').appendTo($('.mCSB_container')).addClass('new');
    for (let property in suggession) {
      //console.log(suggession[property]["stringValue"]);
   //Create an input type dynamically.   
   var element = document.createElement("button");
   var node = document.createTextNode(suggession[property]["stringValue"]);
   element.appendChild(node);
   element.onclick = function(e) { // Note this is a function
     console.log("click",node.nodeValue);
     console.log(suggession[property]["stringValue"]);
     $('.message-input').val(suggession[property]["stringValue"]);
      e.preventDefault() 
     insertMessage(); 
     $(".serverMessage :button").attr("disabled", true);

   };
  var foo=$(".new").last(); 
   foo.append(element);

   //$(".new").find("button").disabled = true;
    }

    
 
  
   


    updateScrollbar();
  }, 100 + (Math.random() * 20) * 100);

}

function myFunction(val)
{
console.log("hi");
console.log(response2);
var test={"Reply":"Good day! What can I do for you today?"};
console.log(val);
}
function fetchmsg(){

     var url = 'http://localhost:5000/send-msg';
      
      const data = new URLSearchParams();
      for (const pair of new FormData(document.getElementById("mymsg"))) {
          data.append(pair[0], pair[1]);
          //console.log(pair)
      }
    
      console.log("abc",data)
        fetch(url, {
          method: 'POST',
          body:data
        }).then(res => res.json())
         .then(response => {
          console.log(response);
          console.log(response["Reply"]["fulfillmentText"]);
          var suggestionMessages=response["Reply"]["fulfillmentMessages"][0]["payload"]["fields"]["buttons"]["structValue"]["fields"]
          console.log(suggestionMessages);
	//serverMessage(response.Reply);
         // speechSynthesis.speak( new SpeechSynthesisUtterance(response.Reply))
         serverMessage(response["Reply"]["fulfillmentText"],suggestionMessages);
         speechSynthesis.speak( new SpeechSynthesisUtterance(response["Reply"]["fulfillmentText"]))
         
          
         })
          .catch(error => console.error('Error h:', error));

}


