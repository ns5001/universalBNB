// $(document).on('turbolinks:load', function() {
//   getSold();
//   getBought();
//   getInProgressBuying();
//   getInProgressSelling();
//
// })
//
// function getSold() {
//   $.ajax({
//     type: 'get',
//     url: '/sold',
//     success: function(response) {
//       $('#userShowPage #sold')[0].innerHTML = ``
//       var html = ``
//       html += `<h3>Your Sold services:</h3><table>
//       <tr>
//         <th>Service Name</th>
//         <th>Buyer</th>
//         <th>Price</th>
//       </tr>`
//
//       for (var i=0;i<response.length;i++) {
//         html += `<tr><td>${response[i].service.name}</td>`
//         html += `<td>${response[i].buyer.firstName} ${response[i].buyer.lastName}</td>`
//         html += `<td>${response[i].service.price}</td></tr>`
//       }
//       html += `</table><br><br>`
//       $('#sold').append(html)
//     }
//   })
// }
//
// function getInProgressBuying() {
//
//   $.ajax({
//       type: 'get',
//       url: '/inProgressBuying',
//       success: function(response) {
//         $('#userShowPage #inProgressBuying')[0].innerHTML = ``
//         var html = `<h3>Services your are buying:</h3><table>
//         <tr>
//           <th>Name</th>
//           <th>Seller</th>
//           <th>Price</th>
//         </tr>`
//         for (var i=0;i<response.length;i++) {
//           html += `<tr><td>${response[i].service.name}</td>`
//           html += `<td>${response[i].seller.firstName} ${response[i].seller.lastName}</td>`
//           html += `<td>${response[i].service.price}</td></tr>`
//         }
//         html += `</table><br><br>`
//         $('#userShowPage #inProgressBuying').append(html)
//       }
//     })
// }
//
// function getInProgressSelling() {
//
//   $.ajax({
//       type: 'get',
//       url: '/inProgressSelling',
//       success: function(response) {
//
//         $('#userShowPage #inProgressSelling')[0].innerHTML = ``
//         var html = ``
//         html += `<h3>Services your are selling:</h3><table>
//         <tr>
//         <th>Service Name</th>
//         <th>Buyer</th>
//         <th>Price</th></tr>`
//
//         for (var i=0;i<response.length;i++) {
//           html += `<tr id="inProgressSelling${response[i].id}"><td>${response[i].service.name}</td>`
//           html += `<td>${response[i].buyer.firstName} ${response[i].buyer.lastName}</td>`
//           html += `<td>${response[i].service.price}</td>`
//           html += `<td><button onClick="approve_submit(${response[i].id})">Approve</button></td>`
//           html += `<td><button onClick="reject_submit(${response[i].id})">Reject</button></td></tr>`
//         }
//         html += `</table><br><br>`
//         $('#userShowPage #inProgressSelling').append(html)
//       }
//     })
// }
//
// function approve_submit(service_id) {
//   $.ajax({
//     type: 'get',
//     url : "/userService/approve/"+service_id,
//     success: function(response) {
//       alert("Approved!");
//       $(`#inProgressSelling${service_id}`)[0].style.display = "none"
//     }
//   })
// }
//
// function reject_submit(service_id) {
//   $.ajax({
//     type: 'get',
//     url : "/userService/reject/"+service_id,
//     success: function(response) {
//       alert("Rejected!");
//       $(`#inProgressSelling${service_id}`)[0].style.display = "none"
//     }
//   })
// }
//
// function getBought() {
//
//   $.ajax({
//   		type: 'get',
//   		url: '/bought',
//   		success: function(response) {
//         $('#userShowPage #bought')[0].innerHTML = ``
//         var html = ``
//         html += `<h3>Services you have bought:</h3><table>
//         <tr>
//           <th>Name</th>
//           <th>Seller</th>
//           <th>Price</th>
//         </tr>`
//
//         for (var i=0;i<response.length;i++) {
//           html += `<tr><td>${response[i].service.name} </td>`
//           html += `<td>${response[i].seller.firstName} ${response[i].seller.lastName} </td>`
//           html += `<td>${response[i].service.price} </td></tr>`
//         }
//         html += `</table><br><br>`
//         $('#bought').append(html)
//       },
//       error: function(response) {
//
//       }
//     })
// }
