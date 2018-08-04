$(document).on('turbolinks:load', function() {
	if($('.users.inbox').length > 0){
		displayReceivedRequests()
		displaySentRequests()
		displaySentMessages()
		displayReceivedMessages()
		acceptRequest()
		declineRequest()
		retractRequest()
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


function displaySentRequests() {
	$.ajax({
		type: 'get',
		url: '/connections/sent.json',
		success: function(response) {
			sentRequests(response)
		}
	})
}


function displayReceivedRequests() {
	$.ajax({
		type: 'get',
		url: '/connections/received.json',
		success: function(response) {
			receivedRequests(response)
		}
	})
}


function replyMessage() {
		$(document).on('click','.reply-message',function(event) {
		event.preventDefault()
		$(`div#received-message-${this.id}`).toggle()
		var serializedData = $(this).parent().serialize()
		$.ajax({
			type: 'post',
			url: '/messages.json',
			datatype: "json",
			data: serializedData,
			success: function(response) {
				alert('Reply Sent!')
			}
		})
	})
}


function acceptRequest() {
	$(document).on('click','.accept-request' ,function(event) {
		event.preventDefault()
		$(`div#received-request-${this.id}`).toggle()
		var request_id = this.id
		$.ajax({
			type: 'PATCH',
			url: `/connections/${request_id}.json`,
			dataype: 'json',
			data: {"status": true},
			success: function(response) {
				alert('You are now connected!')
			}
		})
	})
}


function declineRequest() {
	$(document).on('click','.decline-request' ,function(event) {
		event.preventDefault()
		$(`div#received-request-${this.id}`).toggle()
		var request_id = this.id
		$.ajax({
			type: 'PATCH',
			url: `/connections/${request_id}.json`,
			dataype: 'json',
			data: {"status": false},
			success: function(response) {
				alert('Request Deleted!')
			}
		})
	})
}


function retractRequest() {
	$(document).on('click','.retract-request',function(event) {
		event.preventDefault()
		$(`div#sent-request-${this.id}`).toggle()
		var request_id = this.id
		$.ajax({
			type: 'PATCH',
			url: `/connections/${request_id}.json`,
			dataype: 'json',
			data: {"status": false},
			success: function(response) {
				alert('Request Retracted!')
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
	 debugger;
	for(var i=0;i<response.length;i++) {
		html += `<div id="received-message-${response[i].id}"<p>You receieved a message from ${response[i].user.name}</p>`
		html += `<p> <img src="${response[i].user.profile_pic}"></p>`
		html += `<p><h4>${response[i].content}</h4></p>`

		html += `<form>`
		html += `<input type="hidden" name="message_id" class="message_id" value="${response[i].id}">`
		html += `<input type="text", name="content">`
		html += `<button class="reply-message" id="${response[i].id}" type="submit">Reply</button>`
		html += `</form>`

		html += `<button type="submit" class="delete-received-message" id="${response[i].id}">delete</button>`

		html += `</div>`
	}

	$('.receivedMessages').append(html)
}


function sentMessages(response) {
	var html = ''
	$('.sentMessages').html('')
	for(var i=0;i<response.length;i++) {
		debugger;
		html += `<div id="sent-message-${response[i].id}">
						<p>You sent a message to ${response[i].receiver.name}</p>`
		html += `<p> <img src="${response[i].receiver.profile_pic}"></p>`
		html += `<p><h4>${response[i].content}</h4></p>`

		html += `<button type="submit" class="delete-sent-message" id="${response[i].id}">delete</button>`

		html += `</div>`
	}

	$('.sentMessages').append(html)
}


function sentRequests(response) {
	var html = ''
	$('.sentRequests').html('')

	for(var i=0;i<response.length;i++) {
		html += `<div id="sent-request-${response[i].id}"<p>You requested to connect with ${response[i].receiver.name}</p>`

		html += `<p> <img src="${response[i].receiver.profile_pic}"></p>`
		html += `<p>${response[i].receiver.company}</p>`
		html += `<p>${response[i].receiver.position}</p>`

		html += `<button id="${response[i].id}" class="retract-request" type="submit">Retract</button>`

		html += `</div>`
	}

	$('.sentRequests').append(html)
}

function receivedRequests(response) {
	var html = ''
	$('.receivedRequests').html('')

	for(var i=0;i<response.length;i++) {
		html += `<div id="received-request-${response[i].id}"<p><img src="${response[i].user.profile_pic}"></p>`
		html += `<p>${response[i].user.username} wants to connect!</p>`

		html += `<button class="accept-request" id="${response[i].id}" type="submit">Accept</button>`
		html += `<button id="${response[i].id}" class="decline-request" type="submit">Decline</button>`

		html += `</div>`
	}

	$('.receivedRequests').append(html)
}
