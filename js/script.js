function mudaTema() {
    var x = document.getElementById("light");
    if (x.className === "tema-") {
        x.className += "dark";
    } else {
        x.className = "tema-";
    }

}