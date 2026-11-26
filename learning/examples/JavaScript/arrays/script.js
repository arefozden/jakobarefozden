const poeng = [10, 15, 8, 20];

console.log(poeng[0]);
console.log(poeng.length);

const forste = document.querySelector("#forste");
const antall = document.querySelector("#antall");

forste.textContent = "Første poengsum: " + poeng[0];
antall.textContent = "Antall poengsummer: " + poeng.length;