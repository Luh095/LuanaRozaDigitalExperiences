/* ===================================================
   MENU MOBILE
=================================================== */

const navHeader = document.getElementById("header");
const navToggle = document.getElementById("menuBtn");
const navPanel  = document.getElementById("mainNav");

if (navHeader && navToggle && navPanel) {

    const setMenu = (open) => {

        navPanel.classList.toggle("open", open);

        navToggle.setAttribute("aria-expanded", String(open));

        navToggle.setAttribute(
            "aria-label",
            open ? "Fechar menu" : "Abrir menu"
        );

    };

    // Abre e fecha pelo botão

    navToggle.addEventListener("click", (e) => {

        e.stopPropagation();

        setMenu(navToggle.getAttribute("aria-expanded") !== "true");

    });

    // Fecha ao escolher um link

    navPanel.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => setMenu(false));

    });

    // Fecha ao tocar fora do menu

    document.addEventListener("click", (e) => {

        if (!navHeader.contains(e.target)) setMenu(false);

    });

    // Fecha com Esc e devolve o foco ao botão

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape" &&
            navToggle.getAttribute("aria-expanded") === "true") {

            setMenu(false);
            navToggle.focus();

        }

    });

    // Volta ao estado normal se a tela crescer

    window.addEventListener("resize", () => {

        if (window.innerWidth > 1024) setMenu(false);

    });

}
