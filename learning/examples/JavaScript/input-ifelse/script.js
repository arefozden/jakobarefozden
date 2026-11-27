const alderFelt = document.querySelector("#alder");
const knapp = document.querySelector("#knapp");
const resultat = document.querySelector("#resultat");

knapp.addEventListener("click", function() {

    const alder = Number(alderFelt.value);

    if (alder >= 18) {
        resultat.textContent = "Du er myndig";
    } else {
        resultat.textContent = "Du er under 18";
    }

});