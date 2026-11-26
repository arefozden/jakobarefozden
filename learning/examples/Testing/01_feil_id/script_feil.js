// FEIL: HTML-knappen heter sendKnapp, ikke knapp.
const knapp = document.querySelector("#knapp");
console.log("Fant knapp:", knapp);
knapp.addEventListener("click", function () {
  document.querySelector("#resultat").textContent = "Meldingen er sendt!";
});
