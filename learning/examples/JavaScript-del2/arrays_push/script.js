
const varer = ["Melk", "Brød", "Egg"];

const liste = document.getElementById("vareliste");
const input = document.getElementById("nyVare");
const antall = document.getElementById("antall");

// Viser alle varene
function visVarer() {
    liste.innerHTML = "";

    for (let i = 0; i < varer.length; i++) {
        liste.innerHTML += "<li>" + varer[i] + "</li>";
    }

    antall.textContent = "Antall varer: " + varer.length;
}

// Legger til en ny vare
function leggTilVare() {
    let nyVare = input.value;

    if (nyVare !== "") {
        varer.push(nyVare);
        visVarer();
        input.value = "";
    }
}

// Når vi klikker på knappen
document.getElementById("leggTil")
    .addEventListener("click", leggTilVare);

// Viser varene når siden åpnes
visVarer();
