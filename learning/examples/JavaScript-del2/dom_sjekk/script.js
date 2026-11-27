
const felt = document.querySelector("#oppgave");
const knapp = document.querySelector("#leggTil");
const liste = document.querySelector("#liste");
const status = document.querySelector("#status");


console.log(felt);
console.log(knapp);
console.log(liste);



knapp.addEventListener("click", function() {
    const tekst = felt.value;

    if (tekst === "") {
        status.textContent = "Skriv en oppgave først!";
    } else {
        status.textContent = "";

        const li = document.createElement("li");
        li.textContent = tekst;

        li.addEventListener("click", function() {
            li.classList.toggle("ferdig");
        });

        liste.appendChild(li);

        felt.value = "";
    }
});
