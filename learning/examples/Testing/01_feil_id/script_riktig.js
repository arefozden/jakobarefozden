// RETTET: Samme ID i HTML og JavaScript.
const knapp = document.querySelector("#sendKnapp");
console.log("Fant knapp:", knapp);
knapp.addEventListener("click", function () {
  document.querySelector("#resultat").textContent = "Meldingen er sendt!";
});
