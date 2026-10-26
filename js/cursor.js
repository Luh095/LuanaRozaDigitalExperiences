const cursor=document.querySelector(".cursor");

if (cursor && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {

    document.addEventListener("mousemove",(e)=>{

        cursor.style.left=e.clientX+"px";

        cursor.style.top=e.clientY+"px";

    });

}
