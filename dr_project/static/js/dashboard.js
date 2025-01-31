/* globals Chart:false, feather:false */

(function () {
  'use strict'

  // Visit And Sales Statistics Chart
  var ctx1 = document.getElementById('patientChart').getContext('2d');
  var visitAndSalesChart = new Chart(ctx1, {
      type: 'bar',
      data: {
          labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'],
          datasets: [
              { label: 'RCT', data: [30, 50, 70, 40, 60, 50, 70, 90], backgroundColor: '#ff6384' },
              { label: 'C&P', data: [40, 60, 80, 50, 70, 60, 80, 100], backgroundColor: '#36a2eb' },
              { label: 'CBD', data: [50, 70, 10, 60, 80, 70, 90, 110], backgroundColor: '#cc65fe' }
          ]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });

  // Traffic Sources Chart
  var ctx2 = document.getElementById('trafficSourcesChart').getContext('2d');
  var trafficSourcesChart = new Chart(ctx2, {
      type: 'doughnut',
      data: {
          labels: ['Web', 'Direct', 'Reference','Walk In'],
          datasets: [{
              data: [30, 20, 40, 10],
              backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#15F5BA']
          }]
      },
      options: {
          responsive: true
      }
  });

})()

//
//
//// Event listeners for other functionalities
//document.addEventListener('DOMContentLoaded', function() {
//    console.log('DOM fully loaded and parsed');
//
//    // Make elements editable
//    const editProfileBtn = document.getElementById('edit-profile-btn');
//    const editableElements = document.querySelectorAll('.editable');
//
//    if (editProfileBtn) {
//        console.log('Edit profile button found');
//        editProfileBtn.addEventListener('click', function() {
//            editableElements.forEach(function(element) {
//                if (element.isContentEditable) {
//                    element.contentEditable = "false";
//                    element.classList.remove('editable-border');
//                    console.log('Element set to non-editable:', element);
//                } else {
//                    element.contentEditable = "true";
//                    element.classList.add('editable-border');
//                    console.log('Element set to editable:', element);
//                }
//            });
//        });
//    } else {
//        console.log('Edit profile button not found');
//    }
//
//    // Add a class for visual feedback
//    const style = document.createElement('style');
//    style.innerHTML = `
//        .editable-border {
//            border: 1px dashed #fff;
//            padding: 5px;
//        }
//    `;
//    document.head.appendChild(style);
//});
