const knapp = document.querySelector("#tema");
knapp.addEventListener("click", function () {
  document.body.classList.toggle("mork");
  console.log("Body-klasser:", document.body.className);
});
