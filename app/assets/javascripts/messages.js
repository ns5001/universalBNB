$(document).on('turbolinks:load', function() {
	if($('.users.inbox').length > 0){
		displaySentMessages()
		displayReceivedMessages()
		replyMessage()
		deleteReceivedMessage()
		deleteSentMessage()
	}
})


function deleteReceivedMessage() {
	$(document).on('click','.delete-received-message',function(event) {
		event.preventDefault()
		$("div#received-message-"+this.id).toggle()
		var message_id = this.id
		$.ajax({
			type: 'delete',
			url: "/messages/" + message_id + ".json",
			datatype: "json",
			success: function(response) {
				alert('Message Deleted!')
			}
		})
	})
}


function deleteSentMessage() {
	$(document).on('click','.delete-sent-message',function(event) {
		event.preventDefault()
		$("div#sent-message-"+this.id).toggle()
		var message_id = this.id
		$.ajax({
			type: 'delete',
			url: "/messages/" + message_id + ".json",
			datatype: "json",
			success: function(response) {
				alert('Message Deleted!')
			}
		})
	})
}

function replyMessage() {
		$(document).on('click','.reply-message',function(event) {
		event.preventDefault()
		$(`div#received-message-${this.id}`).toggle()

		var sendInfo = {
				sender: $(`#sender_id${this.id}`)[0].value,
				content: $(`#content${this.id}`)[0].value,
				message_id: this.id,
				current_user: $(`#current_user${this.id}`)[0].value
		};

		$.ajax({
			type: 'post',
			url: '/messages/createReply',
			datatype: "json",
			data: sendInfo,
			success: function(response) {
				alert('Reply Sent!')
				document.location.reload()
			}
		})
	})
}

function displaySentMessages() {
	$.ajax({
		type: 'get',
		url: '/messages/sent.json',
		success: function(response) {
			sentMessages(response)
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
	$('.receivedMessages').html('')
	for(var i=0;i<response.length;i++) {
		html += `<div class="message col-md-4 primrose_black" id="received-message-${response[i].id}">`
		// html += `<p> <img src="${response[i].user.profile_pic}"></p>`
        html += `<h3 class="primrose_crimson margin-bottom-1">From ${response[i].user.firstName} ${response[i].user.lastName}: </h3>`
        html += `<p><h4>${response[i].content}</h4></p>`
		html += `<form>`
		html += `<input type="hidden" id="sender_id${response[i].id}" value="${response[i].user.id}">`
		html += `<input type="hidden" id="current_user${response[i].id}" value="${response[i].receiver.id}">`
		html += `<textarea class="primrose_black" id="content${response[i].id}" />`
		html += `</form>`

		html += `<button type="submit" class="delete-received-message btn btn-danger margin-right-2 margin-top-2" id="${response[i].id}">delete</button>`
        html += `<button class="reply-message btn btn-default margin-right-2 margin-top-2" id="${response[i].id}" type="submit">Reply</button>`
		html += `</div>`
	}

	$('.receivedMessages').append(html)
}


function sentMessages(response) {
	var html = ''
	$('.sentMessages').html('')
	for(var i=0;i<response.length;i++) {
		html += `<div class="message col-md-4 primrose_black" id="sent-message-${response[i].id}">`
		// html += `<p> <img src="${response[i].receiver.profile_pic}"></p>`
        html += `<h3 class="primrose_crimson margin-bottom-1">Sent to ${response[i].receiver.firstName} ${response[i].receiver.lastName}: </h3>`
        html += `<h4>${response[i].content}</h4>`

		html += `<button type="submit" class="delete-sent-message btn btn-danger margin-right-2 margin-top-2" id="${response[i].id}">delete</button>`

		html += `</div>`
	}

	$('.sentMessages').append(html)
}
