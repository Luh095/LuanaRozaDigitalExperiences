const loader = document.getElementById("loader");

const bar = document.querySelector(".progress-bar");

const percent = document.getElementById("loaderPercent");

let value = 0;

const interval = setInterval(()=>{

    value++;

    bar.style.width=value+"%";

    percent.textContent=value+"%";

    if(value>=100){

        clearInterval(interval);

        setTimeout(()=>{

            loader.style.opacity=0;

            loader.style.pointerEvents="none";

            setTimeout(()=>{

                loader.remove();

            },1000);

        },500);

    }

},25);