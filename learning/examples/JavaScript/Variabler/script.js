let navn = "Sara";
let alder = 16;

console.log(navn);
console.log(alder);

navn = "Ola";  // OK
alder = 17;    // OK

console.log(navn);
console.log(alder);



let pris = 120;
let antall = 3;
const total = pris * antall;
console.log(total);
const tillegg = 30;  // OK

antall = 5;       // OK
// tillegg = 30;  // Feil: tillegg er const
pris=200;
const total1 = pris * antall + tillegg;
// total = 700;   // Feil: total er const

console.log(total1);