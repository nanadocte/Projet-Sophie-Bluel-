// Affichage du filtre selectionné 




export function selected (){
    const buttons = document.querySelectorAll(".portfolio-filtres button")
    buttons.forEach(button=> {
        button.addEventListener("click", (event)=>{
            buttons.forEach(button => button.classList.remove("selected"))
                event.target.classList.add("selected")
            }) 
    })
}
   

// Selection filtres et affichages en conséquent 
export function selectionButton(works, getWorks) {
const buttons = document.querySelectorAll(".portfolio-filtres button")

buttons.forEach(button => {
button.addEventListener("click", ()=>{
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

    const categories = works.map(work => work.category.name)
    const categoriesName = [...new Set(categories)]
    console.log(categoriesName)

    categoriesName.forEach(button => {
        const newList = document.createElement("li")
        const newButton = document.createElement("button")
        newButton.innerText = button
        
        portfolio.appendChild(newList)
        newList.appendChild(newButton)
})
}






