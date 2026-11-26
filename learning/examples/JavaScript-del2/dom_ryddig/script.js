
const felt = document.querySelector("#oppgave");
const knapp = document.querySelector("#leggTil");
const liste = document.querySelector("#liste");
const status = document.querySelector("#status");

// Legger til en ny oppgave
function leggTilOppgave() {
    const tekst = felt.value;

    if (tekst === "") {
        status.textContent = "Skriv en oppgave først!";
    } else {
        status.textContent = "";

        const li = document.createElement("li");
        li.textContent = tekst;

        // Marker oppgaven som ferdig
        li.addEventListener("click", function() {
            li.classList.toggle("ferdig");
        });

        liste.appendChild(li);

        felt.value = "";
    }
}

// Kjør funksjonen når knappen klikkes
knapp.addEventListener("click", leggTilOppgave);
