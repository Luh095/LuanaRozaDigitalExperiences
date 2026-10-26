/*==================================================
PRICING
Luana Roza - Digital Experiences
==================================================*/


/*==================================================
CUSTOM QUOTE BUILDER
==================================================*/

const customQuoteToggle =
    document.getElementById("custom-quote-toggle");

const customQuoteBuilder =
    document.getElementById("custom-quote-builder");

const customQuoteCheckboxes =
    document.querySelectorAll('input[name="customService"]');

const customQuoteTotalValue =
    document.getElementById("custom-quote-total-value");

const customQuoteSubmit =
    document.getElementById("custom-quote-submit");


if (customQuoteToggle && customQuoteBuilder) {

    customQuoteToggle.addEventListener("click", () => {

        const isOpen = !customQuoteBuilder.hidden;

        customQuoteBuilder.hidden = isOpen;

        customQuoteToggle.classList.toggle("open", !isOpen);

        customQuoteToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        customQuoteToggle.querySelector("span").textContent =
            isOpen
                ? "Personalizar por serviço"
                : "Ocultar personalização";

    });

}


/*==================================================
TOTAL CALCULATION
==================================================*/

function formatCurrency(value) {

    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 0
    });

}


function getSelectedServices() {

    return Array.from(customQuoteCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => ({
            name: checkbox.value,
            price: Number(checkbox.dataset.price)
        }));

}


function updateCustomQuoteTotal() {

    const selected = getSelectedServices();

    const total = selected.reduce(
        (sum, service) => sum + service.price,
        0
    );

    if (customQuoteTotalValue) {

        customQuoteTotalValue.textContent =
            formatCurrency(total);

    }

    if (customQuoteSubmit) {

        customQuoteSubmit.disabled = selected.length === 0;

    }

}


customQuoteCheckboxes.forEach((checkbox) => {

    checkbox.addEventListener("change", updateCustomQuoteTotal);

});


/*==================================================
STORE QUOTE AND REDIRECT
==================================================*/

function storeQuoteAndGo(subject, message) {

    const params = new URLSearchParams({ subject, message });

    window.location.href = `index.html?${params.toString()}#contact`;

}


/*==================================================
SUBMIT CUSTOM QUOTE
==================================================*/

if (customQuoteSubmit) {

    customQuoteSubmit.addEventListener("click", () => {

        const selected = getSelectedServices();

        if (selected.length === 0) {

            return;

        }

        const total = selected.reduce(
            (sum, service) => sum + service.price,
            0
        );

        const messageLines = selected.map(
            (service) => `- ${service.name} (${formatCurrency(service.price)})`
        );

        const message =
            "Olá! Gostaria de um orçamento para os seguintes serviços:\n\n" +
            messageLines.join("\n") +
            `\n\nTotal estimado: ${formatCurrency(total)}\n\n` +
            "Conte um pouco mais sobre o projeto aqui:";

        storeQuoteAndGo("Orçamento personalizado", message);

    });

}


/*==================================================
SUBMIT FIXED PACKAGE
==================================================*/

const pricingCardButtons =
    document.querySelectorAll(".pricing-card-button");

pricingCardButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        const card = button.closest(".pricing-card");

        if (!card) {

            return;

        }

        event.preventDefault();

        const name =
            card.querySelector(".pricing-card-name").textContent.trim();

        const price =
            card.querySelector(".pricing-value").textContent.trim();

        const featureLines = Array.from(
            card.querySelectorAll(".pricing-card-features li")
        ).map((item) => `- ${item.textContent.trim()}`);

        const message =
            `Olá! Tenho interesse no pacote ${name} (${price}).\n\n` +
            "Itens inclusos:\n" +
            featureLines.join("\n") +
            "\n\nConte um pouco mais sobre o projeto aqui:";

        storeQuoteAndGo(`Orçamento - Pacote ${name}`, message);

    });

});
