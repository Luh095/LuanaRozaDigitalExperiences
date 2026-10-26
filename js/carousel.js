/*==================================================
  CAROUSEL PREMIUM V2
  Luana Roza - Digital Experiences
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".carousel-card");
    const prevBtn = document.querySelector(".carousel-button.prev");
    const nextBtn = document.querySelector(".carousel-button.next");
    const indicators = document.querySelector(".carousel-indicators");

    if (!cards.length) return;

    let current = 0;
    let autoplay = null;

    /*==========================================
      CRIAR INDICADORES
    ==========================================*/

    cards.forEach((_, index) => {

        const dot = document.createElement("button");

        dot.className = "carousel-dot";

        dot.setAttribute("aria-label", `Ir para card ${index + 1}`);

        dot.addEventListener("click", () => {

            current = index;

            updateCarousel();

            restartAutoplay();

        });

        indicators.appendChild(dot);

    });

    const dots = document.querySelectorAll(".carousel-dot");

    /*==========================================
      POSICIONAMENTO
    ==========================================*/

    function updateCarousel() {

        cards.forEach(card => {

            card.classList.remove(
                "active",
                "left",
                "right",
                "far-left",
                "far-right",
                "hidden"
            );

        });

        const total = cards.length;

        cards[current].classList.add("active");

        cards[(current - 1 + total) % total].classList.add("left");

        cards[(current + 1) % total].classList.add("right");

        cards[(current - 2 + total) % total].classList.add("far-left");

        cards[(current + 2) % total].classList.add("far-right");

        cards.forEach((card) => {

            if (
                !card.classList.contains("active") &&
                !card.classList.contains("left") &&
                !card.classList.contains("right") &&
                !card.classList.contains("far-left") &&
                !card.classList.contains("far-right")
            ) {

                card.classList.add("hidden");

            }

        });

        dots.forEach(dot => dot.classList.remove("active"));

        dots[current].classList.add("active");

    }

    /*==========================================
      NAVEGAÇÃO
    ==========================================*/

    function next() {

        current = (current + 1) % cards.length;

        updateCarousel();

    }

    function prev() {

        current = (current - 1 + cards.length) % cards.length;

        updateCarousel();

    }

    nextBtn.addEventListener("click", () => {

        next();

        restartAutoplay();

    });

    prevBtn.addEventListener("click", () => {

        prev();

        restartAutoplay();

    });

    /*==========================================
      TECLADO
    ==========================================*/

    document.addEventListener("keydown", (e) => {

        if (e.key === "ArrowRight") {

            next();

            restartAutoplay();

        }

        if (e.key === "ArrowLeft") {

            prev();

            restartAutoplay();

        }

    });

    /*==========================================
      AUTOPLAY
    ==========================================*/

    function startAutoplay() {

        autoplay = setInterval(() => {

            next();

        }, 5000);

    }

    function stopAutoplay() {

        clearInterval(autoplay);

    }

    function restartAutoplay() {

        stopAutoplay();

        startAutoplay();

    }

    /*==========================================
      PAUSAR AO PASSAR O MOUSE
    ==========================================*/

    const container = document.querySelector(".carousel-container");

    container.addEventListener("mouseenter", stopAutoplay);

    container.addEventListener("mouseleave", startAutoplay);

    /*==========================================
      SWIPE MOBILE
    ==========================================*/

    let startX = 0;

    container.addEventListener("touchstart", (e) => {

        startX = e.touches[0].clientX;

    });

    container.addEventListener("touchend", (e) => {

        const endX = e.changedTouches[0].clientX;

        const diff = startX - endX;

        if (diff > 60) {

            next();

        }

        if (diff < -60) {

            prev();

        }

        restartAutoplay();

    });

    

    /*==========================================
      INICIALIZAÇÃO
    ==========================================*/

    updateCarousel();

    startAutoplay();

});