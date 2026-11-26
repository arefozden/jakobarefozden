const felt = document.querySelector("#tall");
const knapp = document.querySelector("#doble");
knapp.addEventListener("click", function () {
  const verdi = felt.value;
  console.log("Input som tekst:", verdi, typeof verdi);
  // FEIL: + gir tekstsammenslåing når verdi er tekst.
  const resultat = verdi + verdi;
  console.log("Resultat:", resultat);
  document.querySelector("#resultat").textContent = "Dobbelt: " + resultat;
});
