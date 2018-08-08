$(document).on('turbolinks:load', function() {
   if(document.body.className == "userShowPage"){
  getSold();
  getBought();
  getInProgressBuying();
  getInProgressSelling();
  }
})

function getSold() {
  $.ajax({
    type: 'get',
    url: '/sold',
    success: function(response) {
      $('#sold')[0].innerHTML = ``
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
        $('#inProgressBuying')[0].innerHTML = ``
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
        html += `</table><br><br>`
        $('#inProgressBuying').append(html)
      }
    })
}

function getInProgressSelling() {

  $.ajax({
      type: 'get',
      url: '/inProgressSelling',
      success: function(response) {

        $('#inProgressSelling')[0].innerHTML = ``
        var html = ``
        html += `<h3>Services your are selling:</h3><table>
        <tr>
        <th>Service Name</th>
        <th>Buyer</th>
        <th>Price</th></tr>`

        for (var i=0;i<response.length;i++) {
          html += `<tr id="inProgressSelling${response[i].service.id}"><td>${response[i].service.name}</td>`
          html += `<td>${response[i].buyer.firstName} ${response[i].buyer.lastName}</td>`
          html += `<td>${response[i].service.price}</td>`
          html += `<td><button onClick="approve_submit(${response[i].id})">Approve</button></td></tr>`
        }
        html += `</table><br><br>`
        $('#inProgressSelling').append(html)
      }
    })
}

function approve_submit(service_id) {
  $.ajax({
    type: 'get',
    url : "/userService/approve/"+service_id,
    success: function(response) {
      alert("Approved!");
      $(`#inProgressSelling${service_id}`)[0].style.display = "none"
    }
  })
}


function getBought() {

  $.ajax({
  		type: 'get',
  		url: '/bought',
  		success: function(response) {
        $('#bought')[0].innerHTML = ``
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
        html += `</table><br><br>`
        $('#bought').append(html)
      },
      error: function(response) {

      }
    })
}
