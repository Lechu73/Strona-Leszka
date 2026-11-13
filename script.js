
document.addEventListener("DOMContentLoaded", function () {

    const check = document.querySelector("#check");
    const menu = document.querySelector(".menu");

    if (check && menu) {
        const linkiMenu = menu.querySelectorAll("a");

        linkiMenu.forEach(function (link) {
            link.addEventListener("click", function () {
                check.checked = false;
            });
        });
    }

    const modal = document.querySelector("#modal");
    const openModal = document.querySelector("#openModal");
    const closeModal = modal ? modal.querySelector(".close") : null;

    function otworzModal() {
        if (modal) {
            modal.style.display = "block";
        }
    }

    function zamknijModal() {
        if (modal) {
            modal.style.display = "none";
        }
    }

    if (openModal) {
        openModal.addEventListener("click", otworzModal);
    }

    if (closeModal) {
        closeModal.addEventListener("click", zamknijModal);
    }

    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                zamknijModal();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            zamknijModal();
        }
    });

    function pokaz(element, tekst, poprawnie) {
        if (!element) return;

        element.textContent = tekst;
        element.style.display = "block";
        element.classList.remove("blad", "sukces");
        element.classList.add(poprawnie ? "sukces" : "blad");
    }

    const contactForm = document.querySelector("#contactForm");
    const contactMsg = document.querySelector("#contactMsg");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const telefon = document.querySelector("#telefon");

            if (telefon) {
                const numer = telefon.value.replace(/\D/g, "");

                if (numer.length !== 9) {
                    telefon.setCustomValidity(
                        "Numer telefonu musi zawierać 9 cyfr."
                    );
                    telefon.reportValidity();
                    telefon.setCustomValidity("");
                    return;
                }
            }

            const zgoda = document.querySelector("#zgoda");

            if (zgoda && !zgoda.checked) {
                zgoda.reportValidity();
                return;
            }

            pokaz(
                contactMsg,
                "Dziękuję! Formularz został poprawnie wypełniony. To jest wersja demonstracyjna – wiadomość nie została wysłana.",
                true
            );

            contactForm.reset();
        });
    }

    const newsletterForm = document.querySelector("#newsletterForm");
    const newsletterMsg = document.querySelector("#newsletterMsg");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!newsletterForm.checkValidity()) {
                newsletterForm.reportValidity();
                return;
            }

            const emailNewsletter =
                newsletterForm.querySelector("#newsletter");

            if (!emailNewsletter) return;

            pokaz(
                newsletterMsg,
                "Dziękuję! Adres został poprawnie wpisany. To jest wersja demonstracyjna – zapis nie został wysłany.",
                true
            );

            newsletterForm.reset();
        });
    }

});
