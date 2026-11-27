const felt = document.querySelector("#alder");
document.querySelector("#sjekk").addEventListener("click", function () {
  const resultat = document.querySelector("#resultat");
  if (felt.value === "") {
    resultat.textContent = "Skriv inn alder først.";
    return;
  }
  const alder = Number(felt.value);
  console.log("Alder:", alder);
  if (alder < 0) {
    resultat.textContent = "Alder kan ikke være negativ.";
  } else if (alder >= 18) {
    resultat.textContent = "Du er myndig.";
  } else {
    resultat.textContent = "Du er under 18.";
  }
});
