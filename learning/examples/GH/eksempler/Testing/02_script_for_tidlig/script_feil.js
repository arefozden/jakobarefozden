const knapp = document.querySelector("#knapp");
console.log("Knapp:", knapp);
knapp.addEventListener("click", function () {
  document.querySelector("#resultat").textContent = "Det virker!";
});
