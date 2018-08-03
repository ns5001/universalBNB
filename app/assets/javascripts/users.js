$(document).on('turbolinks:load', function() {
  getSold();
  getBought();
  displayReceivedMessages()
})

function getSold() {

}

function getBought() {
  $.ajax({
  		type: 'get',
  		url: '/bought',
  		success: function(response) {
        var html = `<table>`
        for (var i=0;i<response.length;i++) {
         // html += `<tr>${response[i].receiver.username}</tr>`
        }
        html += `</table>`
        $('#bought').append(html)
      }
    })
}

function displayReceivedMessages() {
	$.ajax({
		type: 'get',
		url: '/messages/received',
		success: function(response) {
			receivedMessages(response)
		}
	})
}

function receivedMessages(response) {
	var html = ''
	$('#inbox')[0].innerHtml = ``

	for(var i=0;i<response.length;i++) {
		html += `<div id="received-message-${response[i].id}"<p>You receieved a message from ${response[i].user.firstName} ${response[i].user.lastName}</p>`
		html += `<p><h4>${response[i].content}</h4></p>`

		html += `<form>`
		html += `<input type="hidden" name="message_id" class="message_id" value="${response[i].id}">`
		html += `<input type="text", name="content">`
		html += `<button class="reply-message" id="${response[i].id}" type="submit">Reply</button>`
		html += `</form>`

		html += `<button type="submit" class="delete-received-message" id="${response[i].id}">delete</button>`

		html += `</div>`
	}

	$('#inbox')[0].innerHTML = html
}
