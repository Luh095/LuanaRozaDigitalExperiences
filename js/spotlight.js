const light = document.getElementById("spotlight");

if (light) {

    document.addEventListener("mousemove", (e) => {

        light.style.left = e.clientX + "px";
        light.style.top = e.clientY + "px";

    });

}