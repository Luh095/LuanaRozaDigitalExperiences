/*==================================================
PROJECTS
Luana Roza - Digital Experiences
==================================================*/


/*==================================================
PROJECT CARDS
==================================================*/

const projectCards = document.querySelectorAll(".project-card");


/*==================================================
SCROLL REVEAL
==================================================*/

if(projectCards.length){

    const projectObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if(!entry.isIntersecting){

                    return;

                }

                const card = entry.target;

                const index = [...projectCards].indexOf(card);

                setTimeout(() => {

                    card.classList.add("show");

                }, index * 160);

                observer.unobserve(card);

            });

        },

        {
            threshold:0.18
        }

    );


    projectCards.forEach((card) => {

        projectObserver.observe(card);

    });

}


/*==================================================
MOUSE EFFECT
==================================================*/

projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;

        const y = event.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - 0.5) * -2;

        const rotateY =
            ((x / rect.width) - 0.5) * 2;

        card.style.transform = `
            translateY(-8px)
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});