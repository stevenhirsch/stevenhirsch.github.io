/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

window.onload = function()
{
  document.getElementById("spanYear").innerHTML = new Date().getFullYear();
}

/* For text apperance on main page */
'use strict';
window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var wrapper = document.getElementById('wrapper');
        if (typeof wrapper.classList !== 'undefined') {
            wrapper.classList.add('slide-items');
        }
        else {
            var curentclass = wrapper.className;
            currentclass += ' slide-items';
            wrapper.className = currentclass;
        }
    }, 2000);
});
