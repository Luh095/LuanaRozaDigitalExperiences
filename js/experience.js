/*==================================================
EXPERIENCE
Luana Roza - Digital Experiences
==================================================*/


/*==================================================
EXPERIENCE ITEMS
==================================================*/

const experienceItems =
    document.querySelectorAll(".experience-item");


/*==================================================
SCROLL REVEAL
==================================================*/

if (experienceItems.length) {

    const experienceObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {

                        return;

                    }

                    const item = entry.target;

                    const index =
                        [...experienceItems].indexOf(item);


                    setTimeout(() => {

                        item.classList.add("show");

                    }, index * 180);


                    observer.unobserve(item);

                });

            },

            {
                threshold: 0.18
            }

        );


    experienceItems.forEach((item) => {

        experienceObserver.observe(item);

    });

}