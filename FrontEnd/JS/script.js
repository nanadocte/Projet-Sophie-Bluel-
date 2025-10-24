import { selectionButton, getButtons, getWorks } from './gallery.js';
import {affichageEdition, logOut} from './edition.js' ;
import {gererModal, getWorksModal, remplirSelectCategories, gererAjoutModal } from './modale.js';





let works = []
let categories = []

async function  main (){
    try{
    const response = await fetch("http://localhost:5678/api/works"); 
    works = await response.json(); 
    const responseCategories = await fetch("http://localhost:5678/api/categories")
    categories = await responseCategories.json()
    }
    catch(error) {
        console.error(error.message)
    }

    getWorks(works)
    getButtons(categories)
    selectionButton(works, getWorks)
    affichageEdition()
    logOut()
    gererModal(works, categories)
    getWorksModal (works);
    remplirSelectCategories(categories);
    gererAjoutModal()

}



main()











