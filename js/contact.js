/*==================================================
CONTACT
Luana Roza - Digital Experiences
==================================================*/


/*==================================================
CONTACT CONTENT
==================================================*/

const contactContent =
    document.querySelector(".contact-content");


/*==================================================
SCROLL REVEAL
==================================================*/

if (contactContent) {

    const contactObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {

                        return;

                    }


                    entry.target.classList.add("show");


                    observer.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0.15
            }

        );


    contactObserver.observe(
        contactContent
    );

}


/*==================================================
FORM SUBMISSION (WEB3FORMS)
==================================================*/

const contactForm =
    document.getElementById("contact-form");

const contactStatus =
    document.getElementById("contact-form-status");


if (contactForm) {

    const contactSubmitButton =
        contactForm.querySelector(".contact-submit");


    /*==================================================
    PREFILL FROM QUOTE (PRECOS.HTML)
    ==================================================*/

    const quoteParams =
        new URLSearchParams(window.location.search);

    const quoteSubject = quoteParams.get("subject");

    const quoteMessage = quoteParams.get("message");

    if (quoteSubject || quoteMessage) {

        const subjectInput =
            document.getElementById("contact-subject");

        const messageInput =
            document.getElementById("contact-message");

        if (subjectInput && quoteSubject) {

            subjectInput.value = quoteSubject;

        }

        if (messageInput && quoteMessage) {

            messageInput.value = quoteMessage;

        }

        window.history.replaceState(
            {},
            document.title,
            window.location.pathname + window.location.hash
        );

    }


    const contactEmailInput =
        document.getElementById("contact-email");

    const contactEmailError =
        document.getElementById("contact-email-error");

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


    /*==================================================
    EMAIL VALIDATION
    ==================================================*/

    function isEmailValid() {

        return emailPattern.test(
            contactEmailInput.value.trim()
        );

    }


    function updateEmailFeedback() {

        const value = contactEmailInput.value.trim();

        if (value === "" || isEmailValid()) {

            contactEmailInput.classList.remove("invalid");

            contactEmailError.textContent = "";

            return true;

        }


        contactEmailInput.classList.add("invalid");

        contactEmailError.textContent =
            "Digite um e-mail válido, ex: nome@dominio.com";

        return false;

    }


    contactEmailInput.addEventListener(
        "input",
        updateEmailFeedback
    );

    contactEmailInput.addEventListener(
        "blur",
        updateEmailFeedback
    );


    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        if (!updateEmailFeedback()) {

            contactEmailInput.focus();

            contactStatus.textContent =
                "Corrija o e-mail informado antes de enviar.";

            contactStatus.classList.remove("success");

            contactStatus.classList.add("error");

            return;

        }


        contactSubmitButton.disabled = true;

        contactStatus.textContent = "Enviando mensagem...";

        contactStatus.classList.remove("success", "error");


        try {

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json"
                    },
                    body: new FormData(contactForm)
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {

                throw new Error(
                    result.message || "Falha ao enviar mensagem."
                );

            }


            contactStatus.textContent =
                "Mensagem enviada com sucesso! Retornarei em breve.";

            contactStatus.classList.add("success");

            contactForm.reset();

        } catch (error) {

            contactStatus.textContent =
                "Não foi possível enviar sua mensagem. Tente novamente ou envie um e-mail direto.";

            contactStatus.classList.add("error");

        } finally {

            contactSubmitButton.disabled = false;

        }

    });

}