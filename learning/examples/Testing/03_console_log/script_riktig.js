const felt = document.querySelector("#tall");
const knapp = document.querySelector("#doble");
knapp.addEventListener("click", function () {
  const verdi = Number(felt.value);
  console.log("Input som tall:", verdi, typeof verdi);
  const resultat = verdi * 2;
  console.log("Resultat:", resultat);
  document.querySelector("#resultat").textContent = "Dobbelt: " + resultat;
});
