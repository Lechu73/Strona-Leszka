document.addEventListener("DOMContentLoaded", function () {
    // Menu mobilne – zamknij menu po wybraniu pozycji.
    const check = document.querySelector("#check");
    const menu = document.querySelector(".menu");

    if (check && menu) {
        menu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                check.checked = false;
            });
        });
    }

    // Okno modalne oferty.
    const modal = document.querySelector("#modal");
    const openModal = document.querySelector("#openModal");
    const closeModal = modal ? modal.querySelector(".close") : null;
    const modalContactLink = modal ? modal.querySelector('a[href="#kontakt"]') : null;

    function otworzModal() {
        if (!modal) return;
        modal.classList.add("open");
    }

    function zamknijModal() {
        if (!modal) return;
        modal.classList.remove("open");
    }

    if (openModal) {
        openModal.addEventListener("click", function (event) {
            event.preventDefault();
            otworzModal();
        });
    }

    if (closeModal) {
        closeModal.addEventListener("click", zamknijModal);
    }

    if (modalContactLink) {
        modalContactLink.addEventListener("click", zamknijModal);
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

    // Komunikaty formularzy. Klasy ok/err są zgodne z arkuszem CSS.
    function pokaz(element, tekst, poprawnie) {
        if (!element) return;

        element.textContent = tekst;
        element.style.display = "block";
        element.classList.remove("ok", "err");
        element.classList.add(poprawnie ? "ok" : "err");
    }

    // Formularz kontaktowy – wersja demonstracyjna, bez wysyłania wiadomości.
    const contactForm = document.querySelector("#contactForm");
    const contactMsg = document.querySelector("#contactMsg");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const telefon = contactForm.querySelector("#telefon");

            if (telefon) {
                const numer = telefon.value.replace(/\D/g, "");

                if (numer.length !== 9) {
                    telefon.setCustomValidity("Numer telefonu musi zawierać 9 cyfr.");
                    telefon.reportValidity();
                    telefon.setCustomValidity("");
                    return;
                }
            }

            pokaz(
                contactMsg,
                "Dziękuję! Formularz został poprawnie wypełniony. To jest wersja demonstracyjna – wiadomość nie została wysłana.",
                true
            );

            contactForm.reset();
        });
    }

    // Newsletter – również wersja demonstracyjna, bez zapisywania adresu.
    const newsletterForm = document.querySelector("#newsletterForm");
    const newsletterMsg = document.querySelector("#newsletterMsg");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!newsletterForm.checkValidity()) {
                newsletterForm.reportValidity();
                return;
            }

            pokaz(
                newsletterMsg,
                "Dziękuję! Adres został poprawnie wpisany. To jest wersja demonstracyjna – zapis nie został wysłany.",
                true
            );

            newsletterForm.reset();
        });
    }
});
