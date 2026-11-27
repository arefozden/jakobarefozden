// Vi lagrer oppgavene i en array med objekter.
const oppgaver = [
    { tekst: "Øve til prøve", kategori: "Skole", ferdig: false },
    { tekst: "Fotballtrening", kategori: "Fritid", ferdig: true }
];

const felt = document.querySelector("#oppgave");
const kategori = document.querySelector("#kategori");
const knapp = document.querySelector("#leggTil");
const liste = document.querySelector("#oppgaveliste");
const statusFelt = document.querySelector("#statusFelt");
const totalt = document.querySelector("#totalt");
const ferdige = document.querySelector("#ferdige");
const gjenstar = document.querySelector("#gjenstar");
const tomListe = document.querySelector("#tomListe");

function visOppgaver() {
    liste.innerHTML = "";
    let antallFerdige = 0;

    for (let i = 0; i < oppgaver.length; i++) {
        const oppgave = oppgaver[i];
        if (oppgave.ferdig === true) {
            antallFerdige++;
        }

        const li = document.createElement("li");
        li.classList.add("task-item");
        if (oppgave.ferdig === true) {
            li.classList.add("ferdig");
        }

        const innhold = document.createElement("div");
        innhold.classList.add("task-main");
        innhold.setAttribute("role", "button");
        innhold.setAttribute("tabindex", "0");
        innhold.setAttribute("aria-label", "Marker oppgaven " + oppgave.tekst + " som ferdig eller aktiv");

        const navn = document.createElement("span");
        navn.classList.add("task-name");
        navn.textContent = oppgave.tekst;

        const kategoriTekst = document.createElement("span");
        kategoriTekst.classList.add("task-category");
        kategoriTekst.textContent = oppgave.kategori;

        innhold.appendChild(navn);
        innhold.appendChild(kategoriTekst);

        function byttStatus() {
            oppgave.ferdig = !oppgave.ferdig;
            visOppgaver();
        }
        innhold.addEventListener("click", byttStatus);
        innhold.addEventListener("keydown", function(event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                byttStatus();
            }
        });

        const slettKnapp = document.createElement("button");
        slettKnapp.type = "button";
        slettKnapp.classList.add("delete");
        slettKnapp.textContent = "Slett";
        slettKnapp.setAttribute("aria-label", "Slett " + oppgave.tekst);
        slettKnapp.addEventListener("click", function() {
            oppgaver.splice(i, 1);
            visOppgaver();
        });

        li.appendChild(innhold);
        li.appendChild(slettKnapp);
        liste.appendChild(li);
    }

    totalt.textContent = oppgaver.length;
    ferdige.textContent = antallFerdige;
    gjenstar.textContent = oppgaver.length - antallFerdige;
    if (oppgaver.length === 0) {
        tomListe.classList.remove("hidden");
    } else {
        tomListe.classList.add("hidden");
    }
}

function leggTilOppgave() {
    const tekst = felt.value;
    if (tekst === "" || tekst.trim() === "") {
        statusFelt.textContent = "Skriv en oppgave først!";
    } else {
        oppgaver.push({ tekst: tekst, kategori: kategori.value, ferdig: false });
        statusFelt.textContent = "Oppgaven er lagt til.";
        felt.value = "";
        visOppgaver();
    }
}

knapp.addEventListener("click", leggTilOppgave);
visOppgaver();
