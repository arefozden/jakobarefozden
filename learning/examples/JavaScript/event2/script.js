const knapp = document.querySelector("#knapp");
const melding = document.querySelector("#melding");

knapp.addEventListener("click", function() {
    melding.textContent = "Hei fra JavaScript!";
});