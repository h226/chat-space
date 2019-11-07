$(function(){
  function buildHTML(message){
    var image = message.image ? `<img class="lower-message__image" src=${message.image}>` : "";
      var html = `<div class="messages__message" data-message-id="${message.id}">
                    <div class="messages__message__upper-info">
                      <div class="messages__message__upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div class="messages__message__upper-info__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="messages__message__text">
                      ${message.content}
                    </div>
                    <div>
                      ${image}
                    </div>
                  </div>`
    return html;
  }
$(document).on('turbolinks:load', function(){
  $('#new_message').on('submit', function(e){
      e.preventDefault();
      var message = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url, 
        type: 'POST',  
        data: message,  
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(message){
        var html = buildHTML(message);
        $('.chat-space__messages').append(html);
        $('.chat-space__messages').animate({
          scrollTop: $('.chat-space__messages')[0].scrollHeight
        }, 'fast');
        $('.form__submit').prop('disabled', false);
        $('#new_message')[0].reset();
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
    })
  })

  var reloadMessages = function() {
    var href = 'api/messages#index {:format=>"json"}'
    var last_message_id = $('.messages__message:last').data('message-id'); 
    $.ajax({
      url: href,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message);
        $('.chat-space__messages').append(insertHTML);
        $('.chat-space__messages').animate({scrollTop: $('.chat-space__messages')[0].scrollHeight}, 'fast');
      });
    })
    .fail(function() {
      alert('error');
    });
  }
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
  setInterval(reloadMessages, 5000);
}});
