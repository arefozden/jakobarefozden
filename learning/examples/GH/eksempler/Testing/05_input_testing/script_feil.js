const felt = document.querySelector("#alder");
document.querySelector("#sjekk").addEventListener("click", function () {
  const alder = Number(felt.value);
  console.log("Alder:", alder);
  if (alder >= 18) {
    document.querySelector("#resultat").textContent = "Du er myndig.";
  } else {
    document.querySelector("#resultat").textContent = "Du er under 18.";
  }
});
