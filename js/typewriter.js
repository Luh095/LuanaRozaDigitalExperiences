const words = [

"Desenvolvedora Front-End",

"Criadora de Experiências Digitais",

"Especialista em Interfaces",

"Freelancer",

"UI Designer"

];

const changing = document.getElementById("changingText");

let word = 0;

let letter = 0;

let deleting = false;

function type(){

let current = words[word];

if(!deleting){

changing.textContent = current.substring(0,letter++);

if(letter > current.length){

deleting = true;

setTimeout(type,1800);

return;

}

}else{

changing.textContent = current.substring(0,letter--);

if(letter < 0){

deleting=false;

word=(word+1)%words.length;

}

}

setTimeout(type,deleting?35:70);

}

type();