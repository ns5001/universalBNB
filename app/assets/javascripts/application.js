$(document).on('turbolinks:load', function() {
	getServices();
});

function getServices() {
	$.ajax({
		type: 'get',
		url: '/services.json',
		success: function(response) {
			var html = ''
			for (var i=0;i<response.length;i++) {
				html+= `<div class="aService" id="${response[i].id}">`
				html+= `<p>${response[i].name}</p>`
				html+= `<p>${response[i].price}</p>`
				html+= `<h5>Seller:${response[i].user.email}</h5>`
				html+= `</div><br>`
			}
			$('#services-list').append(html)
		}
	})
}
