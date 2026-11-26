const knapp = document.querySelector("#tema");
knapp.addEventListener("click", function () {
  // FEIL: CSS bruker mork, JavaScript bruker mørk.
  document.body.classList.toggle("mørk");
  console.log("Body-klasser:", document.body.className);
});
