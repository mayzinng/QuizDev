// function mudaTema() {
//     var x = document.getElementById("light");
//     if (x.className === "tema-") {
//         x.className += "dark";
//     } else {
//         x.className = "tema-";
//     }

// }

var light = document.getElementById('light');

light.onclick = function() {
    document.body.classList.toggle("dark-theme");
}

function quiz() {
    window.location.href = "choices.html";
}