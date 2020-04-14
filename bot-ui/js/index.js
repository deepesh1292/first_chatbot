var $messages = $(".messages-content");
var serverResponse = "wala";

var suggession;
//speech reco
try {
  var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
} catch (e) {
  console.error(e);
  $(".no-browser-support").show();
}

$("#start-record-btn").on("click", function (e) {
  recognition.start();
});

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
  document.getElementById("MSG").value = speechToText;
  //console.log(speechToText)
  insertMessage();
};

function listendom(no) {
  console.log(no);
  //console.log(document.getElementById(no))
  document.getElementById("MSG").value = no.innerHTML;
  insertMessage();
}

$(window).load(function () {
  $messages.mCustomScrollbar();
  setTimeout(function () {
    serverMessage(
      "Hello, Welcome to our Company Website. How can I help you? ",
      "",
      ""
      ,""
    );
    speechSynthesis.speak(
      new SpeechSynthesisUtterance("Hello, Welcome to our Company Website.  How can I help you? ")
    );
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar("scrollTo", "bottom", {
    scrollInertia: 10,
    timeout: 0,
  });
}

function insertMessage() {
  msg = $(".message-input").val();
  console.log("msg",msg);
  if ($.trim(msg) == "") {
    return false;
  }
  $('<div class="message message-personal">' + msg + "</div>")
    .appendTo($(".mCSB_container"))
    .addClass("new");
  fetchmsg();

  $(".message-input").val(null);
  updateScrollbar();
}

document.getElementById("mymsg").onsubmit = (e) => {
  e.preventDefault();
  insertMessage();
};

function serverMessage(response2, suggession, Action,payloadtext) {
  console.log(payloadtext);
  if ($(".message-input").val() != "") {
    return false;
  }
 
   $(
    '<div class="message loading new serverMessage"><figure class="avatar"><img src="css/bot.png" /></figure><span></span></div>'
  ).appendTo($(".mCSB_container")); 
  updateScrollbar();

  setTimeout(function () {
    $(".message.loading").remove();
    
      if(payloadtext)
      {
        
        $(
          '<div class="message new serverMessage"><figure class="avatar"><img src="css/bot.png" /></figure><div class="payloadText">'+payloadtext+'</div><p>' +
            response2 +
            "</p></div>"
        )
          .appendTo($(".mCSB_container"))
          .addClass("new");
    
      }else
      {
        $(
          '<div class="message new serverMessage"><figure class="avatar"><img src="css/bot.png" /></figure><p>' +
            response2 +
            "</p></div>"
        )
          .appendTo($(".mCSB_container"))
          .addClass("new");
    
      }
    console.log("Action -------------", Action);
    console.log("suggession -------------", suggession);

    if (!isEmpty(suggession))  {  
      if (Action === "policy.policy-no.policy-no-custom") {
        for (var value in suggession) {
          var foo = $(".new").last();
          foo
            .append(
              `<label class="container" for="${suggession[value]["stringValue"]}">${suggession[value]["stringValue"]}<input type="checkbox" id="${suggession[value]["stringValue"]}" name="interest" value="${suggession[value]["stringValue"]}"> <span class="checkmark"></span></label>`
            );
        }
  
        var element = document.createElement("button");
        var node = document.createTextNode(
          'Send'
        );
        element.appendChild(node);
        element.onclick = function (e) {
          var favorite = [];
          $.each( $(".serverMessage:last-child  input[name='interest']:checked"), function () {
            favorite.push($(this).val());
          });
         /*  $.each($("input[name='interest']:checked"), function () {
            favorite.push($(this).val());
          }); */
          console.log(favorite);
          if(favorite.length > 0)
          {
            $(".message-input").val(favorite.join(", "));
            e.preventDefault();
            insertMessage();
            $(".serverMessage :button").attr("disabled", true);
            $(".serverMessage :input[name='interest']").attr("disabled", true);
          }
         
        }
        var foo = $(".new").last();
        foo.append(element);
      } else {
        for (let property in suggession) {
          var element = document.createElement("button");
          var node = document.createTextNode(
            suggession[property]["stringValue"]
          );
          element.appendChild(node);
          element.onclick = function (e) {
            // Note this is a function
            console.log("click", node.nodeValue);
            console.log(suggession[property]["stringValue"]);
            $(".message-input").val(suggession[property]["stringValue"]);
            e.preventDefault();
            insertMessage();
            $(".serverMessage :button").attr("disabled", true);
          };
          var foo = $(".new").last();
          foo.append(element);
        }
      } 
    }

    updateScrollbar();
  }, 100 + Math.random() * 20 * 100);
}
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
function myFunction(val) {
  console.log("hi");
  console.log(response2);
  var test = { Reply: "Good day! What can I do for you today?" };
  console.log(val);
}
function fetchmsg() {
  var url = "https://bot-appjs.herokuapp.com/send-msg";

  const data = new URLSearchParams();
  for (const pair of new FormData(document.getElementById("mymsg"))) {
    data.append(pair[0], pair[1]);
    //console.log(pair)
  }

  console.log("abc", data);
  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      console.log(response["Reply"]["fulfillmentText"]);
      var suggestionMessages =
        response["Reply"]["fulfillmentMessages"][0]["payload"]["fields"][
          "buttons"
        ]["structValue"]["fields"];
      console.log(suggestionMessages);
      var queryAction = response["Reply"]["action"];
      console.log("queryAction", queryAction);
      var payloadtext;
      if(("text" in response["Reply"]["fulfillmentMessages"][0]["payload"]["fields"]))
      {
        payloadtext=response["Reply"]["fulfillmentMessages"][0]["payload"]["fields"]["text"]["stringValue"]

      }
      //serverMessage(response.Reply);
      // speechSynthesis.speak( new SpeechSynthesisUtterance(response.Reply))
      serverMessage(
        response["Reply"]["fulfillmentText"],
        suggestionMessages,
        queryAction,
        payloadtext
      );
      speechSynthesis.speak(
        new SpeechSynthesisUtterance(response["Reply"]["fulfillmentText"])
      );
    })
    .catch((error) => console.error("Error h:", error));
}
