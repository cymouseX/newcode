io.sails.url = 'https://vbot-api.herokuapp.com/';
io.socket.post(io.sails.url + '/chat', { 'mode': 'test' }, function (data, jwRes) {
// if (jwRes.statusCode != 200) {
//     addMessage(1, "Connection error!");
// } else {
//     addMessage(1, "--&gt; thiết lập kết nối thành công &lt;--");
// }
  addMessage(1, "Đã kết nối!");
});

io.socket.on('newmessage', function (data){
  addMessage(1, data.reply);
    // Scroll to last message
    $('.messages').animate({scrollTop: $('.messages').prop("scrollHeight")}, 500);
});


// Append chat into page
var chatHtml = '<div class="chatbox-wrapper">';
chatHtml += '<div class="title">';
chatHtml += '<i class="fa fa-user-o" aria-hidden="true"></i>';
chatHtml += '<span> ViVi Chatbot</span>';
chatHtml += '<span class="toggle-chat" role="button">Open</span>';
chatHtml += '</div>';
chatHtml += '<div class="messages"></div>';
chatHtml += '<div class="sendbox">';
chatHtml += '<input type="text" class="newmessage" placeholder="type and enter">';
chatHtml += '<button class="send"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>';
chatHtml += '</div>';
chatHtml += '</div>';
$('body').append(chatHtml);


// Scroll to last message
$('.messages').animate({scrollTop: $('.messages').prop("scrollHeight")}, 500);

// Bind keys
$(document).keypress(function(e){
    if (e.which == 13 && $(".chatbox-wrapper .newmessage").is(":focus")){
        $(".chatbox-wrapper .send").click();
        return false;
    }
});

// Click send button
var currUser = 1;
$('.chatbox-wrapper .send').click(function() {
  var message = $('.sendbox .newmessage').val();
  addMessage(2, message);

  // Scroll to last message
  $('.messages').animate({scrollTop: $('.messages').prop("scrollHeight")}, 500);
  $('.sendbox .newmessage').val('');


  // FOR IMPLEMENTING AJAX CONNECTION INSTEAD OF WEBSOCKET
  // $.ajax({
  //     url: "https://vbot-api.herokuapp.com/chat",
  //     type: "POST",
  //     crossDomain: true,
  //     data: {"message": message},
  //     dataType: "json",
  //     success: function (data) {
  //         console.log(data);
  //         if (data.reply != '') {
  //           addMessage(1, data.reply);
  //           // Scroll to last message
  //           $('.messages').animate({scrollTop: $('.messages').prop("scrollHeight")}, 500);
  //         }
  //     },
  //     error: function (xhr, status) {
  //         alert("error");
  //     }
  // });

  io.socket.post('/chat', { 'message': message }, function (data, jwRes) {
    jwRes.statusCode; // => 200
    if (data.reply != '') {
      addMessage(1, data.reply);
      // Scroll to last message
      $('.messages').animate({scrollTop: $('.messages').prop("scrollHeight")}, 500);
  }

});




});

// Click chat title bar
$('.chatbox-wrapper .title').click(function() {
  if($('.chatbox-wrapper .toggle-chat').html() == 'Close') {
    $('.chatbox-wrapper .toggle-chat').html('Open');
  } else {
    $('.chatbox-wrapper .toggle-chat').html('Close');
  }
  $('.chatbox-wrapper .messages').slideToggle(200);
  $('.chatbox-wrapper .sendbox').slideToggle(200);
});

function addMessage(userId, message) { 
  if (userId == 1) {
    $('.messages').append('<div class="message u1"><span class="content">'+message+'</span><span class="ff"></span></div>');
  } else {
    $('.messages').append('<div class="message u2"><span class="ff"></span><span class="content">'+message+'</span></div>');
  }
}

window.addEventListener("load",function() {
    setTimeout(function(){
        // This hides the address bar:
        window.scrollTo(0, 1);
    }, 0);
});
