
var ADRES_SERWERA_EMERGENT = 'https://strona-leszka--';
var API_BASE =.host$ | localhost$ /.test(window.location.hostname)
    ? ''
    : ADRES_SERWERA_EMERGENT;

document.addEventListener('DOMContentLoaded', function () {

    var check = document.getElementById('check');
    document.querySelectorAll('.menu a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (check) check.checked = false;
        });
    });

    var modal = document.getElementById('modal');
    var openBtn = document.getElementById('openModal');

    function otworzModal(e) {
        if (e) e.preventDefault();
        modal.classList.add('open');
    }
    function zamknijModal() {
        modal.classList.remove('open');
    }

    if (modal && openBtn) {
        openBtn.addEventListener('click', otworzModal);
        modal.querySelector('.close').addEventListener('click', zamknijModal);
        modal.querySelector('.modal-btn').addEventListener('click', zamknijModal);
        modal.addEventListener('click', function (e) {
            if (e.target === modal) zamknijModal();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') zamknijModal();
        });
    }

    function pokaz(el, tekst, ok) {
        el.textContent = tekst;
        el.className = 'komunikat ' + (ok ? 'ok' : 'err');
    }

    function wyslij(sciezka, dane) {
        return fetch(API_BASE + sciezka, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dane)
        }).then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (body) {
                if (!res.ok) {
                    var msg = typeof body.detail === 'string' ? body.detail : 'Nie udało się wysłać. Spróbuj ponownie.';
                    throw new Error(msg);
                }
                return body;
            });
        });
    }

    var form = document.getElementById('contactForm');
    var msg = document.getElementById('contactMsg');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();


            var pola = form.querySelectorAll('input[required], textarea[required]');
            var pierwszyBlad = null;
            pola.forEach(function (p) {
                var zle = !p.checkValidity() || p.value.trim() === '';
                p.classList.toggle('blad', zle);
                if (zle && !pierwszyBlad) pierwszyBlad = p;
            });
            if (pierwszyBlad) {
                pokaz(msg, 'Uzupełnij poprawnie zaznaczone pola (telefon: 9 cyfr).', false);
                pierwszyBlad.focus();
                return;
            }

            var wybor = form.querySelector('input[name="wybor"]:checked');
            var dane = {
                imie: form.imie.value.trim(),
                nazwisko: form.nazwisko.value.trim(),
                telefon: form.telefon.value.trim(),
                email: form.email.value.trim(),
                temat: form.temat.value.trim(),
                klient: wybor ? wybor.value : 'nie wiem',
                wiadomosc: form.wiadomosc.value.trim()
            };

            var btn = form.querySelector('input[type="submit"]');
            btn.disabled = true;
            pokaz(msg, 'Wysyłanie...', true);

            wyslij('/api/contact', dane)
                .then(function () {
                    pokaz(msg, 'Dziękujemy, wiadomość wysłana! Odezwę się wkrótce.', true);
                    form.reset();
                })
                .catch(function (err) {
                    pokaz(msg, err.message || 'Nie udało się wysłać. Spróbuj ponownie lub zadzwoń.', false);
                })
                .finally(function () { btn.disabled = false; });
        });


        form.addEventListener('input', function (e) {
            if (e.target.classList) e.target.classList.remove('blad');
        });
    }


    var nForm = document.getElementById('newsletterForm');
    var nMsg = document.getElementById('newsletterMsg');

    if (nForm) {
        nForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var email = nForm.newsletter;
            var zgoda = nForm.zgoda;

            var emailZly = !email.checkValidity() || email.value.trim() === '';
            email.classList.toggle('blad', emailZly);
            zgoda.parentElement.classList.toggle('blad', !zgoda.checked);

            if (emailZly) { pokaz(nMsg, 'Podaj poprawny adres e-mail.', false); return; }
            if (!zgoda.checked) { pokaz(nMsg, 'Zaznacz zgodę, aby się zapisać.', false); return; }

            var btn = nForm.querySelector('button');
            btn.disabled = true;
            pokaz(nMsg, 'Zapisywanie...', true);

            wyslij('/api/newsletter', { email: email.value.trim(), zgoda: true })
                .then(function () {
                    pokaz(nMsg, 'Dziękujemy! Adres został zapisany.', true);
                    nForm.reset();
                })
                .catch(function (err) { pokaz(nMsg, err.message, false); })
                .finally(function () { btn.disabled = false; });
        });
    }
});
