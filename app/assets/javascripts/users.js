$(document).on('turbolinks:load', function() {
  debugger;
  getSold();
  getBought();
})

function getSold() {

}

function getBought() {
  $.ajax({
  		type: 'get',
  		url: '/users/bought.json',
  		success: function(response) {
        var html = `<table>`
        for (var i=0;i<response.length;i++) {
         html += `<tr>${response[i].receiver.username}</tr>`
        }
        html += `</table>`
        $('#bought').append(html)
      }
    })
}
