
// Fonction close and open modal 
let modal = null


const openModal = function(event){
    event.preventDefault()
    let target = document.querySelector(event.currentTarget.getAttribute("href"))
    
            target.style.display = null
            target.removeAttribute("aria-hidden")
            target.setAttribute("aria-modal", "true")

            const verificationPresence = document.querySelector(".modal-img")
            if (verificationPresence.children.length=== 0){
                getWorksModal(works)}
            modal = target
            modal.addEventListener("click", closeModal)
            modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
            modal.querySelectorAll(".js-modal-stop").forEach(e=>e.addEventListener("click", stopPropagation))
}

const closeModal = function(event){
    if (modal=== null) return;
    event.preventDefault();
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
            modal.removeAttribute("aria-modal");
            modal.removeEventListener("click", closeModal);
            modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
            modal.querySelectorAll(".js-modal-stop").forEach(e=>e.removeEventListener("click", stopPropagation))
            modal = null
}


const openModalForm = function(e){
    document.querySelector(".modal-gallery").style.display ="none"
    document.querySelector(".modal-form").style.display = null
}

const retourModalGallery = function(e){
    document.querySelector(".modal-form").style.display ="none"
    document.querySelector(".modal-gallery").style.display = null
}
const stopPropagation = function(event){
    event.stopPropagation()
}
document.querySelector(".js-modal-form").addEventListener("click", openModalForm)

document.querySelector(".js-modal-retour").addEventListener("click", retourModalGallery)

document.querySelectorAll(".js-modal").forEach(a=> {
    a.addEventListener("click", openModal)
})

const response = await fetch(`http://localhost:5678/api/works`)
const works = await response.json()



// Récupération des travaux sur la modale 

export function getWorksModal (works){
    works.forEach(work => {
        
        const sectionImg = document.querySelector(".modal-img")
        const workContainer = document.createElement("div")
        const img = document.createElement("img");
        const trash = document.createElement("img");
        workContainer.classList.add("workContainer")
        img.setAttribute("src", work.imageUrl); 
        img.setAttribute("alt", work.title);
        img.classList.add("imagesModal"); 
        trash.setAttribute("src", "./assets/icons/trash.svg")
        trash.setAttribute("alt", "Delete")
        trash.setAttribute("id", work.id)
        trash.addEventListener("click", deleteWork);
        trash.classList.add("delete")
        sectionImg.appendChild(workContainer)
        workContainer.appendChild(trash)
        workContainer.appendChild(img);
    })
}


// DELETE WORKS 


const deleteWork = async function(e){
// ETEZS VOUS SÜRES ? 

    // GET ID 
    
const id = e.target.getAttribute("id")
const token = localStorage.getItem("token")

    //DELETE ID
const response = 
    await fetch(`http://localhost:5678/api/works/${id}`, {
            method:"DELETE",
            headers: {"accept": "*/*",
                        "Authorization": `Bearer ${token}`,
            }
})
if (response.ok) {
    e.target.parentElement.remove(); // supprime uniquement le work supprimé
}
}


// Categories pour la selection 
const responseCategories = await fetch('http://localhost:5678/api/categories')
const categories = await responseCategories.json()
const select = document.querySelector("select")

categories.forEach(c => {
    const option = document.createElement("option")
    option.innerText = c.name
    select.appendChild(option)
})



