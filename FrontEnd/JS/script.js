import { selectionButton, getButtons, getWorks } from './gallery.js';
import {affichageEdition, logOut} from './edition.js' ;






window.works = []
window.categories = []

async function  main (){
    try{
    const response = await fetch("http://localhost:5678/api/works"); 
    window.works = await response.json(); 
    const responseCategories = await fetch("http://localhost:5678/api/categories")
    window.categories = await responseCategories.json()
    }
    catch(error) {
        console.error(error.message)
    }

    getWorks(window.works)
    getButtons(window.works)
    selectionButton(window.works, getWorks)
    affichageEdition()
    logOut()
}



main()











