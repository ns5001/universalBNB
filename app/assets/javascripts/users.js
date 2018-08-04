$(document).on('turbolinks:load', function() {
  getSold();
  getBought();
  displayReceivedMessages();
  getInProgressBuying();
  getInProgressSelling();
  replyMessage();
})

function getSold() {

}


function getInProgressBuying() {
  $.ajax({
      type: 'get',
      url: '/inProgressBuying',
      success: function(response) {

        var html = `<table>
        <tr>
          <th>Name</th>
          <th>Seller</th>
          <th>Price</th>
        </tr>`
        for (var i=0;i<response.length;i++) {
          html += `<tr>${response[i].service.name}</tr>`
          html += `<tr>${response[i].seller.firstName} ${response[i].seller.lastName}</tr>`
          html += `<tr>${response[i].service.price}</tr>`
        }
        html += `</table>`
        $('#inProgressBuying').append(html)
      }
    })
}

function getInProgressSelling() {
  $.ajax({
      type: 'get',
      url: '/inProgressSelling',
      success: function(response) {
        var html = ``
        for (var i=0;i<response.length;i++) {
          html += `<div id="inProgress${response[i].id}"><tr>${response[i].service.name}</tr>`
          html += `<tr>${response[i].buyer.firstName} ${response[i].buyer.lastName}</tr>`
          html += `<tr>${response[i].service.price}</tr>`
          html += `<button onClick="approve_submit(${response[i].id})">Approve</button></div>`
        }
        $('#inProgressSelling').append(html)
      }
    })
}

function approve_submit(service_id) {
  debugger;
  $("#inProgress"+service_id)[0].hidden = true;
  $.ajax({
    type: 'get',
    url : "/userService/approve/"+service_id,
    success: function(response) {
      alert("Approved!");
    }
  })
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

function replyMessage() {
		$(document).on('click','.reply-message',function(event) {
      debugger;
      event.preventDefault()

      var sendInfo = {
          content: $("#reply")[0].value
          message_id: $(".message_id")[0].value
      };
      debugger;
		$(`div#received-message-${this.id}`).toggle()
		$.ajax({
			type: 'get',
			url: '/messages/createReply',
			datatype: "json",
			data: sendInfo,
			success: function(response) {
				alert('Reply Sent!')
			}
		})
	})
}

function receivedMessages(response) {
  	debugger
	var html = ''
	$('.receivedMessages').html(``)

	for(var i=0;i<response.length;i++) {

		html += `<div id="received-message-${response[i].id}"<p>You receieved a message from ${response[i].user.firstName} ${response[i].user.lastName}</p>`
		html += `<p><h4>${response[i].content}</h4></p>`

    html += `<form>`
		html += `<input type="hidden" class="message_id" value="${response[i].id}">`
		html += `<input id="reply" type="text", name="content">`
		html += `<button class="reply-message" id="${response[i].id}" type="submit">Reply</button>`
    html += `</form>`

		html += `<button type="submit" class="delete-received-message" id="${response[i].id}">delete</button>`

		html += `</div>`
	}

	$('.receivedMessages').append(html)
}
