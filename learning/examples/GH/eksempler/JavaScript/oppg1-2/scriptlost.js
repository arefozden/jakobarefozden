// ========================================
// JavaScript 2 – Beslutninger
// Eksempel på svar
// ========================================


// ----------------------------------------
// Oppgave 1 – Alderskontroll
// ----------------------------------------

let navn1 = "Ola";
let alder1 = 20;

if (alder1 >= 18) {
    console.log(navn1 + " er myndig");
} else {
    console.log(navn1 + " er ikke myndig");
}


// ----------------------------------------
// Oppgave 2 – Rabatt ut fra alder
// ----------------------------------------

let alder2 = 16;
let pris;

if (alder2 < 13) {
    pris = 80;
} else if (alder2 <= 17) {
    pris = 100;
} else {
    pris = 140;
}

console.log("Alder: " + alder2);
console.log("Pris: " + pris + " kr");


// ----------------------------------------
// Oppgave 3 – Temperatur
// ----------------------------------------

let temperatur = -3;

if (temperatur < 0) {
    console.log("Det er frost");
} else {
    console.log("Det er ikke frost");
}


// Ekstra:
// Egen melding hvis temperaturen er over 20 grader

if (temperatur < 0) {
    console.log("Det er frost");
} else if (temperatur > 20) {
    console.log("Det er varmt");
} else {
    console.log("Det er ikke frost");
}


// ----------------------------------------
// Oppgave 4 – Poeng og tilbakemelding
// ----------------------------------------

let poeng = 65;

if (poeng >= 80) {
    console.log("Svært bra!");
} else if (poeng >= 50) {
    console.log("Bra jobbet!");
} else {
    console.log("Prøv igjen!");
}


// ----------------------------------------
// Oppgave 5A – OG (&&)
// ----------------------------------------

let navn2 = "Ola";
let alder3 = 15;

if (alder3 >= 13 && alder3 <= 19) {
    console.log(navn2 + " er tenåring");
} else {
    console.log(navn2 + " er ikke tenåring");
}


// ----------------------------------------
// Oppgave 5B – ELLER (||)
// ----------------------------------------

let dag = "lørdag";

if (dag === "lørdag" || dag === "søndag") {
    console.log("Det er helg");
} else {
    console.log("Det er hverdag");
}


// ----------------------------------------
// Oppgave 6 – Mitt eget program
// Eksempel: Fotballkamp
// ----------------------------------------

let maal = 3;
let motstanderMaal = 1;

if (maal > motstanderMaal) {
    console.log("Laget vant kampen!");
} else if (maal === motstanderMaal) {
    console.log("Kampen endte uavgjort.");
} else {
    console.log("Laget tapte kampen.");
}