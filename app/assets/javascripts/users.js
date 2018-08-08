$(document).on('turbolinks:load', function() {
  getSold();
  getBought();
  getInProgressBuying();
  getInProgressSelling();
})


function getSold() {
  $.ajax({
    type: 'get',
    url: '/sold',
    success: function(response) {
      var html = ``
      html += `<h3>Your Sold services:</h3><table>
      <tr>
        <th>Service Name</th>
        <th>Buyer</th>
        <th>Price</th>
      </tr>`

      for (var i=0;i<response.length;i++) {
        html += `<tr>${response[i].service.name}</tr>`
        html += `<tr>${response[i].buyer.firstName} ${response[i].buyer.lastName}</tr>`
        html += `<tr>${response[i].service.price}</tr>`
      }
      html += `</table><br><br>`
      $('#sold').append(html)
    }
  })
}


function getInProgressBuying() {
  $.ajax({
      type: 'get',
      url: '/inProgressBuying',
      success: function(response) {

        var html = `<h3>Services your are buying:</h3><table>
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

        var html = `<h3>Services your are selling:</h3><table>
        <tr>
          <th>Service Name</th>
          <th>Buyer</th>
          <th>Price</th>
        </tr>`

        var html = ``
        for (var i=0;i<response.length;i++) {
          html += `<div id="inProgress${response[i].id}"><tr>${response[i].service.name}</tr>`
          html += `<tr>${response[i].buyer.firstName} ${response[i].buyer.lastName}</tr>`
          html += `<tr>${response[i].service.price}</tr>`
          html += `<button onClick="approve_submit(${response[i].id})">Approve</button></div>`
        }
        html += `</table>`
        $('#inProgressSelling').append(html)
      }
    })
}

function approve_submit(service_id) {
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

        var html = ``
        html += `<h3>Services you have bought:</h3><table>
        <tr>
          <th>Name</th>
          <th>Seller</th>
          <th>Price</th>
        </tr>`

        for (var i=0;i<response.length;i++) {
          html += `<tr><td>${response[i].service.name} </td>`
          html += `<td>${response[i].seller.firstName} ${response[i].seller.lastName} </td>`
          html += `<td>${response[i].service.price} </td></tr>`
        }
        html += `</table>`
        $('#bought').append(html)
      },
      error: function(response) {

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
