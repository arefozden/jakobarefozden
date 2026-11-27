const filterKnapper = document.querySelectorAll(".filter");
const bilder = document.querySelectorAll(".gallery-card");
const galleriStatus = document.querySelector("#galleriStatus");

filterKnapper.forEach(function(knapp) {
    knapp.addEventListener("click", function() {
        const valgtKategori = knapp.dataset.filter;
        let antall = 0;
        bilder.forEach(function(bilde) {
            if (valgtKategori === "Alle" || bilde.dataset.category === valgtKategori) {
                bilde.classList.remove("hidden");
                antall++;
            } else {
                bilde.classList.add("hidden");
            }
        });
        filterKnapper.forEach(function(k) {
            k.classList.remove("active");
            k.setAttribute("aria-pressed", "false");
        });
        knapp.classList.add("active");
        knapp.setAttribute("aria-pressed", "true");
        galleriStatus.textContent = "Viser " + antall + " bilder.";
    });
});
