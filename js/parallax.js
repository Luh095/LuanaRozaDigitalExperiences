const hero =
    document.querySelector(".hero-right");

const frame =
    document.querySelector(".hero-frame");

const semMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


if (hero && frame && !semMotion && window.innerWidth > 1200) {

    hero.addEventListener("mousemove", (e) => {

        const rect = hero.getBoundingClientRect();

        const rotateY = (e.clientX - rect.left - rect.width / 2) / 18;

        const rotateX = (rect.height / 2 - (e.clientY - rect.top)) / 18;

        frame.style.transform =
            `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    hero.addEventListener("mouseleave", () => {

        frame.style.transform = "";

    });

}
