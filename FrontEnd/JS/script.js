import { selectionButton, getButtons, getWorks } from './gallery.js';
import {affichageEdition, logOut} from './edition.js' ;
import {initModal, initAddWork } from './modale.js';





let works = []
let categories = []

async function main (){
    try{
    const response = await fetch("http://localhost:5678/api/works"); 
    works = await response.json(); 
    const responseCategories = await fetch("http://localhost:5678/api/categories")
    categories = await responseCategories.json()
    }
    catch(error) {
        console.error(`Une erreur de réseau est survenue : ${error.message}`)
    }

    getWorks(works)
    getButtons(categories)
    selectionButton(works, getWorks)
    affichageEdition()
    logOut()
    initModal(works, categories)
    initAddWork()

}



main()











