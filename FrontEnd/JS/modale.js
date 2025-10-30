
const stopPropagation = function(event){
        event.stopPropagation()
    }
const focusableSelector = 'button, a, input, textarea, select'
let focusables = []
const containerImgModal = document.querySelector(".modal-img")
const select = document.querySelector("select")


// OPEN - CLOSE 

    // modal -gallery
let modal = null

const openModal = function(event, works){
    event.preventDefault()

    modal = document.querySelector(event.currentTarget.getAttribute("href"))
    modal.style.display = null
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    
    if (containerImgModal && containerImgModal.children.length=== 0){
        showWorksModal(works)
    }
    focusables = Array.from(modalGallery.querySelectorAll(focusableSelector))
    focusables[0].focus()
    
    modal.addEventListener("click", closeModal)
    modal.querySelectorAll(".js-modal-close").forEach(e=> e.addEventListener("click", closeModal))
    modal.querySelectorAll(".js-modal-stop").forEach(e=>e.addEventListener("click", stopPropagation))
}

const closeModal = function(event){

    if (modal=== null) return;
    event.preventDefault();
    modal.setAttribute("aria-hidden", "true");
            window.setTimeout(function(){
                modal.style.display = "none";
                returnModalToGallery()
                modal = null

            }, 300)
            modal.removeAttribute("aria-modal");
            modal.removeEventListener("click", closeModal);
            modal.querySelectorAll(".js-modal-close").forEach(e=>e.removeEventListener("click", closeModal));
            modal.querySelectorAll(".js-modal-stop").forEach(e=>e.removeEventListener("click", stopPropagation))
            resetAddWorkForm()
            suppressionAfficheErreur()
}
    //modal accessibilité
const focusInModal = (e)=> {
     e.preventDefault()
      if (!focusables.length) return
    let index = focusables.findIndex(f => f=== modal.querySelector(':focus'))
    if (e.shiftKey === true ) {
        index -- 
    }
    else {
        index++
    }
    if (index>=focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length -1
    }
   
    focusables[index].focus()
}

window.addEventListener("keydown", function(e){
    if (e.key === "Escape" || e.key === "Esc" ){
        closeModal(e)
    }
    if (e.key === "Tab" && modal !== null ){
        focusInModal(e)
    }
})


    // modal -form 
const modalGallery = document.querySelector(".modal-gallery")
const modalForm = document.querySelector(".modal-form")
const openModalForm = function(categories){
    modalGallery.style.display ="none"
    modalForm.style.display = null
    if (select && select.children.length=== 0){ 
        remplirSelectCategories(categories)
    }
    focusables = Array.from(modalForm.querySelectorAll(focusableSelector))

}

const returnModalToGallery = function(){
    modalForm.style.display ="none"
    modalGallery.style.display = null
    focusables = Array.from(modalGallery.querySelectorAll(focusableSelector))
}




export function initModal(works, categories){

    document.querySelectorAll(".js-modal").forEach(a=> {
        a.addEventListener("click", (event)=> {
            openModal(event, works);

    })
    
    document.querySelector(".js-modal-form").addEventListener("click", () => openModalForm(categories))
    document.querySelector(".js-modal-retour").addEventListener("click", returnModalToGallery)
    })
    
}






function showWorksModal (works){
    works.forEach(work => {
        const workContainer = document.createElement("div")
        const button = document.createElement("button")
        const img = document.createElement("img");
        const trash = document.createElement("img");
        workContainer.classList.add("workContainer")

        button.classList.add("modal-btn")

        img.setAttribute("src", work.imageUrl); 
        img.setAttribute("alt", work.title);
        img.classList.add("imagesModal"); 

        trash.setAttribute("src", "./assets/icons/trash.svg")
        trash.setAttribute("alt", "supprimer")
        trash.setAttribute("data-id", work.id)
        trash.addEventListener("click", deleteWork);
        button.classList.add("delete")

        containerImgModal.appendChild(workContainer)
        workContainer.appendChild(button)
        button.appendChild(trash)
        workContainer.appendChild(img);
    })

}


// DELETE WORKS 
const deleteWork = async function(e){
    // Confirmation 
    if (!confirm("Souhaitez vous supprimer ce travail ?")) return;
    try {

    // get ID
    const id = e.target.getAttribute("data-id");
    if (!id) {
        console.error("ID manquant pour la suppression du travail.");
        return;
    }
    const token = localStorage.getItem("token");

    // delete ID
    const response = 
        await fetch(`http://localhost:5678/api/works/${id}`, {
                method:"DELETE",
                headers: {"accept": "*/*",
                            "Authorization": `Bearer ${token}`,
                }
        })
    if (response.ok) {

        //suppresion dans modale
        const workContainer = e.target.closest(".workContainer");
    if (workContainer) workContainer.remove();
        //Suppression dans gallery 
         const galleryImg = document.querySelector(`.gallery img[data-id="${id}"]`);
        
         if (galleryImg) galleryImg.parentElement.remove()
            console.log("travail supprimé")
    }
    } catch(error) {
        console.error("Une erreur est survenue : " + error.message)
    }
}


// SELECTIONS CATEGORIES  

async function remplirSelectCategories(categories){
    
        const optionVide = document.createElement("option")
        select.appendChild(optionVide)

        categories.forEach(c => {
            const option = document.createElement("option")
            option.innerText = c.name
            option.value = c.id;
            select.appendChild(option)
        })
    
}



// ADD WORKS
const addWork = async function(e){
    e.preventDefault()
    let formData
    const token = localStorage.getItem("token");
    // Récuperer les données dans form
    try {const imageFile = e.target.querySelector("[name=image]").files[0] 
        const title = e.target.querySelector("[name=titre]").value
        const category = e.target.querySelector("[name=categorie]").value
        if (!imageFile || !title || !category){
            throw new Error('Certaines données sont manquantes')
        }

        // préparation formData
        formData= new FormData() 
        formData.append("image", imageFile);
        formData.append("title", title);
        formData.append("category", category)
    }
    catch(error) {
        console.error(error.message)
        afficherErreur()
        return
    }

    //envoi serveur
    try {
        const response = await fetch(`http://localhost:5678/api/works`, {
                        method: "POST",
                        headers : { "accept": 'application/json', 
                                "Authorization": `Bearer ${token}`},
                        body: formData
        })
    if (response.ok){
        
        const newWork = await response.json()
        console.log("Envoi effectué")
        showNewWorkGallery(newWork)
        showNewWorkModal(newWork)
        resetAddWorkForm()
        returnModalToGallery()
        closeModal(e)

    }
    } catch(error){
        console.error(`Une erreur est survenue : ${error.message}` )
        
    }
}

    // to gallery
function showNewWorkGallery (newWork){
    const gallery = document.querySelector(".gallery")
    const figure = document.createElement("figure")
    const image = document.createElement("img")
    const figcaption = document.createElement("figcaption")



    image.src = newWork.imageUrl
    image.alt = newWork.title
    image.dataset.id = newWork.id
    figcaption.innerText = newWork.title

    gallery.appendChild(figure)
    figure.appendChild(image)
    figure.appendChild(figcaption)
}

    // to modal 
function showNewWorkModal(newWork){
    const workContainer = document.createElement("div")
    const button = document.createElement("button")
    const imageModal = document.createElement("img")
    const trash = document.createElement("img")
    
    
    workContainer.classList.add("workContainer")
    button.classList.add("modal-btn", "delete")


    imageModal.src = newWork.imageUrl
    imageModal.alt = newWork.title
    imageModal.classList.add("imagesModal")
    trash.alt = "supprimer"
    trash.src = `./assets/icons/trash.svg`
    trash.setAttribute("data-id", newWork.id)
    trash.addEventListener("click", deleteWork);

    containerImgModal.appendChild(workContainer)
    workContainer.appendChild(imageModal)
    workContainer.appendChild(button)
    button.appendChild(trash)

}



const inputFile = document.querySelector("#fileElem")
const workPreview = function(){
    // recuperer l'image 
    const file = inputFile.files[0]
    
    if(!file) return 
    // Récuperer le container et les enfants pour les cacher 
    const formFilesContainer = document.querySelector(".form-files")
    const formFiles = [...formFilesContainer.children];
    formFiles.forEach(f=> f.classList.add("hidden-for-preview"))

    const oldPreview = document.querySelector(".preview-image")
    // Ajout visuel de l'image 
    if(oldPreview) {oldPreview.remove()}
    const imageFile = document.createElement("img")
    imageFile.src = URL.createObjectURL(file)
    imageFile.alt = "Aperçu de l'image selectionné"
    imageFile.classList.add("preview-image")
    
    formFilesContainer.appendChild(imageFile)
    
}


const form = document.querySelector(".form-add-work")
export function initAddWork() {
    form.addEventListener("submit", addWork)
    
    inputFile.addEventListener("change", workPreview )
}


function resetAddWorkForm(){
    form.reset()
    const image = document.querySelector(".preview-image")
    if (image) image.remove()
    const formFiles = document.querySelectorAll(".hidden-for-preview")
    formFiles.forEach(e=> e.classList.remove("hidden-for-preview"))
}


    
const formulaire = document.querySelector(".form-add-work")

// Messages d'erreur 
function afficherErreur() {


    suppressionAfficheErreur()
    // Ajouter une classe à tous les inputs du formulaire
    const inputs = formulaire.querySelectorAll("input, select")
    const emptyInput = Array.from(inputs).filter(input => !input.value)
    emptyInput.forEach(input => input.classList.add("wrong-password"))
    if (!inputFile.files[0]){
        const containerFiles = document.querySelector(".form-files")
        containerFiles.querySelector("label").classList.add("wrong-password")
    }

    // Ajouter un paragraphe d'erreur s'il n'existe pas déjà
    if (!formulaire.querySelector(".error-message")) {
        const erreur = document.createElement("p")
        erreur.classList.add("error-message")
        erreur.textContent = "Veuillez remplir tous les champs."
        formulaire.appendChild(erreur)
    }
}

function suppressionAfficheErreur (){
formulaire.querySelectorAll(".wrong-password").forEach(el => {
        el.classList.remove("wrong-password")
    })
    if (formulaire.querySelector(".error-message")) formulaire.querySelector(".error-message").remove()
}