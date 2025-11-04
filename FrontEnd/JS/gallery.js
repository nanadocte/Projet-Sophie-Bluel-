


//ajouter dynamiquement les travaux sur la page d’accueil.
export function getWorks(works) { 
    
    const gallery = document.querySelector(".gallery"); 

    
    document.querySelector(".gallery").innerHTML= "";


    works.forEach(element => { 
        
        const figure = document.createElement("figure"); 
        const img = document.createElement("img"); 
        const figcaption = document.createElement("figcaption"); 
        img.setAttribute("src", element.imageUrl); 
        img.setAttribute("alt", element.title); 
        img.setAttribute("data-id", element.id)
        figcaption.innerText = element.title; 
        gallery.appendChild(figure); 
        figure.appendChild(img); 
        figure.appendChild(figcaption); 
    }); 
} 


// Selection filtres et affichages en conséquent 
export function selectionButton(works, getWorks) {
const buttons = document.querySelectorAll(".portfolio-filtres button")

buttons.forEach(button => {

button.addEventListener("click", (event)=>{
    //Add selected class 
    buttons.forEach(button => button.classList.remove("selected"))
    event.target.classList.add("selected")

    // Add functionality to filter 
    const categoryName = button.textContent;
    const filteredWorks = categoryName === "Tous" ? 
        works : works.filter(work => work.category.name === categoryName)

    getWorks(filteredWorks)
    }
)})
}



//Affichage dynamique des boutons 
export function getButtons (categories) {
    const portfolio = document.querySelector(".portfolio-filtres")
    // bouton TOUS
    const liTous = document.createElement("li")
    const buttonTous = document.createElement("button")
    buttonTous.classList.add("visible");
    buttonTous.classList.add('public-element')
    buttonTous.innerText = "Tous"
    liTous.appendChild(buttonTous);
    portfolio.appendChild(liTous);

    //bouton avec categories
    
    const categoriesButton = categories.map(c => c.name)
    const categoriesName = [...new Set(categoriesButton)]
    categoriesName.forEach(category => {
        const newList = document.createElement("li")
        const newButton = document.createElement("button")
        newButton.innerText = category
        newButton.classList.add("visible")
        newButton.classList.add('public-element')

        portfolio.appendChild(newList)
        newList.appendChild(newButton)
})
}








