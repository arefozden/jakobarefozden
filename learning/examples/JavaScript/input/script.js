const navnfelt = document.querySelector("#navn");
const knapp = document.querySelector("#knapp");
const resultat = document.querySelector("#resultat");

knapp.addEventListener("click", function() {
    const navn = navnfelt.value;

    console.log(navn);
    resultat.textContent = "Hei, " + navn + "!";
    console.log(resultat.textContent);
});