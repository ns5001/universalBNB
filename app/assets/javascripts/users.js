$(document).on('turbolinks:load', function() {
  getSold();
  getBought();
  displayReceivedMessages();
  getInProgressBuying();
  getInProgressSelling();
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

function receivedMessages(response) {
	var html = ''
	$('#inbox')[0].innerHtml = ``

	for(var i=0;i<response.length;i++) {
		html += `<div id="received-message-${response[i].id}"<p>You receieved a message from ${response[i].user.firstName} ${response[i].user.lastName}</p>`
		html += `<p><h4>${response[i].content}</h4></p>`

		html += `<input type="hidden" name="message_id" class="message_id" value="${response[i].id}">`
		html += `<input type="text", name="content">`
		html += `<button class="reply-message" id="${response[i].id}" type="submit">Reply</button>`

		html += `<button type="submit" class="delete-received-message" id="${response[i].id}">delete</button>`

		html += `</div>`
	}

	$('#inbox')[0].innerHTML = html
}
