let navn = "Ali";
let alder = 16;
let elev;

if (alder >= 16) {
    elev = true;
} else {
    elev = false;
}

console.log("Navn: " + navn);
console.log("Alder: " + alder);
console.log("Er elev: " + elev);


// Vi endrer verdiene
navn = "Jane";
alder = 15;

if (alder >= 16) {
    elev = true;
} else {
    elev = false;
}

console.log("Navn: " + navn);
console.log("Alder: " + alder);
console.log("Er elev: " + elev);