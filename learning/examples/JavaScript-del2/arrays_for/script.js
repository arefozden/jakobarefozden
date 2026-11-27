
const varer = ["Melk", "Brød", "Egg"];
const liste = document.getElementById("vareliste");

for (let i = 0; i < varer.length; i++) {
    liste.innerHTML += "<li>" + varer[i] + "</li>";
}
