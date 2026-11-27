
const varer = ["Melk", "Brød", "Egg"];
const liste = document.getElementById("vareliste");

varer.forEach(function(vare) {
    liste.innerHTML += "<li>" + vare + "</li>";
});