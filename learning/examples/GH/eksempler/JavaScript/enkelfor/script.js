const poeng = [10, 15, 8, 20];

const liste = document.querySelector("#liste");

for (let i = 0; i < poeng.length; i++) {
    console.log(poeng[i]);

    liste.innerHTML += "<li>" + poeng[i] + "</li>";
}