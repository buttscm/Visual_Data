var slider = document.getElementById("yearRange");
var output = document.getElementById("currentYear");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}