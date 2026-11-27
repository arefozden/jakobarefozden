const navn = document.querySelector("#navn");
const epost = document.querySelector("#epost");
const melding = document.querySelector("#melding");
const kontaktStatus = document.querySelector("#kontaktStatus");
const sendKnapp = document.querySelector("#sendMelding");

sendKnapp.addEventListener("click", function() {
    if (navn.value === "" || epost.value === "" || melding.value === "") {
        kontaktStatus.textContent = "Du må fylle ut alle feltene.";
        kontaktStatus.classList.remove("success");
    } else {
        kontaktStatus.textContent = "Takk for meldingen! (Dette er bare en demonstrasjon.)";
        kontaktStatus.classList.add("success");
    }
});
