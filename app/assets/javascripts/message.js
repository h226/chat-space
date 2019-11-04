$(function(){
  function buildHTML(message){
    var image = message.image ? `<img class="lower-message__image" src=${message.image}>` : "";
      var html = `<div class="messages__message">
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
})