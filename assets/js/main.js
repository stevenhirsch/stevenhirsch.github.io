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


/* Function to Toggle Darkmode */
/*
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {        document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);
*/
