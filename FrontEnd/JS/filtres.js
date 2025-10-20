
// Selection filtres et affichages en conséquent 
export function selectionButton(works, getWorks) {
const buttons = document.querySelectorAll(".portfolio-filtres button")

buttons.forEach(button => {

button.addEventListener("click", (event)=>{
    //Add selected class 
    buttons.forEach(button => button.classList.remove("selected"))
    event.target.classList.add("selected")
    // Add functionality to filter 
    const categoryName = button.textContent.trim();
    console.log(categoryName)
    const filteredWorks = categoryName === "Tous" 
        ? works 
        : works.filter(work => work.category.name === categoryName)

    getWorks(filteredWorks)
    }
)})
}


//Affichage dynamique des boutons 
export function getButtons (works) {
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
    const categories = works.map(work => work.category.name)
    const categoriesName = [...new Set(categories)]

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








