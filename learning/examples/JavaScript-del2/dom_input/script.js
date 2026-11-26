
const felt = document.querySelector("#oppgave");
const knapp = document.querySelector("#leggTil");
const liste = document.querySelector("#liste");
const statusFelt = document.querySelector("#status");


console.log(felt);
console.log(knapp);
console.log(liste);

knapp.addEventListener("click", function() {
    const tekst = felt.value;
    statusFelt.textContent = tekst;
});