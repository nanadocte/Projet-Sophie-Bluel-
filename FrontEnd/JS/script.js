import { selectionButton, getButtons } from './filtres.js';

const response = await fetch("http://localhost:5678/api/works"); 
const works = await response.json(); 


function main (){
    getWorks(works)
    getButtons(works)
    selectionButton(works, getWorks)
   
}


//ajouter dynamiquement les travaux sur la page d’accueil.
function getWorks(works) { 
    const gallery = document.querySelector(".gallery"); 
    
    document.querySelector(".gallery").innerHTML= "";


    works.forEach(element => { 
        const figure = document.createElement("figure"); 
        const img = document.createElement("img"); 
        const figcaption = document.createElement("figcaption"); 
        img.setAttribute("src", element.imageUrl); 
        img.setAttribute("alt", element.title); 
        figcaption.innerText = element.title; 
        gallery.appendChild(figure); 
        figure.appendChild(img); 
        figure.appendChild(figcaption); 
    }); 
} 






main()










