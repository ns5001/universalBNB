// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).on('turbolinks:load', function() {
	getServices();
});

function getServices() {
	$('#services-list')[0].innerHTML = ``;
	$.ajax({
		type: 'get',
		url: '/services.json',
		success: function(response) {
			var html = ``
			for (var i=0;i<response.length;i++) {
				if (response[i].purchased == false) {
					html+= `<div class="aService" id="${response[i].id}">`
					html+= `<p>${response[i].name}</p>`
					html+= `<p>Price: ${response[i].price}</p>`
				  html+= `<h5>Seller: ${response[i].user.email}</h5>`
					html+= `<a href="/services/${response[i].id}" type="button">More Info</a>`
					html+= `</div><br>`
				}
			}
			$('#services-list').append(html)
		}
	})
}
