
//supprimer l'input file si ajout d'un nv fichier 


// Fonction close and open modal gallery
let modal = null
const openModal = function(event){
    event.preventDefault()
    let target = document.querySelector(event.currentTarget.getAttribute("href"))
            target.style.display = null
            target.removeAttribute("aria-hidden")
            target.setAttribute("aria-modal", "true")

            const verificationPresence = document.querySelector(".modal-img")
            if (verificationPresence.children.length=== 0){
                getWorksModal()
            }
            modal = target
            modal.addEventListener("click", closeModal)
            modal.querySelectorAll(".js-modal-close").forEach(e=> e.addEventListener("click", closeModal))
            modal.querySelectorAll(".js-modal-stop").forEach(e=>e.addEventListener("click", stopPropagation))
}

const closeModal = function(event){
    if (modal=== null) return;
    event.preventDefault();
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
            modal.removeAttribute("aria-modal");
            modal.removeEventListener("click", closeModal);
            modal.querySelectorAll(".js-modal-close").forEach(e=>e.removeEventListener("click", closeModal));
            modal.querySelectorAll(".js-modal-stop").forEach(e=>e.removeEventListener("click", stopPropagation))
            modal = null
}


// Open and close MODALFORM
const openModalForm = function(e){
    document.querySelector(".modal-gallery").style.display ="none"
    document.querySelector(".modal-form").style.display = null
    remplirSelectCategories()
}

const retourModalGallery = function(e){
    document.querySelector(".modal-form").style.display ="none"
    document.querySelector(".modal-gallery").style.display = null
}



document.querySelector(".js-modal-form").addEventListener("click", openModalForm)

document.querySelector(".js-modal-retour").addEventListener("click", retourModalGallery)

document.querySelectorAll(".js-modal").forEach(a=> {
    a.addEventListener("click", openModal)
})


const stopPropagation = function(event){
    event.stopPropagation()
}



// Récupération des travaux sur la modale 
function getWorksModal (){
    window.works.forEach(work => {
        const sectionImg = document.querySelector(".modal-img")
        const workContainer = document.createElement("div")
        const img = document.createElement("img");
        const trash = document.createElement("img");
        workContainer.classList.add("workContainer")

        img.setAttribute("src", work.imageUrl); 
        img.setAttribute("alt", work.title);
        img.classList.add("imagesModal"); 

        trash.setAttribute("src", "./assets/icons/trash.svg")
        trash.setAttribute("alt", "supprimer")
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
    // Confirmation ? 
    if (!confirm("Souhaitez vous supprimer ce travail ?")) return;
    try {
    // GET ID 
    const id = e.target.getAttribute("id");
    const token = localStorage.getItem("token");

    //DELETE ID
    const response = 
        await fetch(`http://localhost:5678/api/works/${id}`, {
                method:"DELETE",
                headers: {"accept": "*/*",
                            "Authorization": `Bearer ${token}`,
                }
        })
    if (response.ok) {
        e.target.parentElement.remove();
        //Suppression gallery 
         const galleryImg = document.querySelector(`.gallery img[data-id="${id}"]`);
        
         if (galleryImg) galleryImg.parentElement.remove()
    }
    console.log("travail supprimé")
    } catch(error) {
        console.error("Une erreur est survenue : " + error.message)
    }
}


// Select categories

async function remplirSelectCategories(){
    
        const select = document.querySelector("select")
        select.innerHTML =""
        const optionVide = document.createElement("option")
        select.appendChild(optionVide)

        window.categories.forEach(c => {
            const option = document.createElement("option")
            option.innerText = c.name
            option.value = c.id;
            select.appendChild(option)
        })
    
}



// Ajout de travaux 

//add event submit 

const addWork = async function(e){
    e.preventDefault()

    const token = localStorage.getItem("token");

    const imageFile = e.target.querySelector("[name=image]").files[0] 
    const title = e.target.querySelector("[name=titre]").value
    const category = e.target.querySelector("[name=categorie]").value

    const formData= new FormData() 
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("category", category)

    
    try {
        const response = await fetch(`http://localhost:5678/api/works`, {
                        method: "POST",
                        headers : { "accept": 'application/json', 
                                "Authorization": `Bearer ${token}`},
                        body: formData
        });
        
    if (response.ok){
        console.error("Envoi effectué")
        // ADD work to gallery 
        const newWork = await response.json()
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


        //ADD work to modal
        const imagesModal = document.querySelector(".modal-img")
        const workContainer = document.createElement("div")
        workContainer.classList.add("workContainer")
        const imageModal = document.createElement("img")
        const trash = document.createElement("img")

        imageModal.src = newWork.imageUrl
        imageModal.alt = newWork.title
        imageModal.classList.add("imagesModal")
        trash.alt = "supprimer"
        trash.src = `./assets/icons/trash.svg`
        trash.classList.add("delete")
        trash.setAttribute("id", newWork.id)
        trash.addEventListener("click", deleteWork);

        imagesModal.appendChild(workContainer)
        workContainer.appendChild(imageModal)
        workContainer.appendChild(trash)
    }
    
} catch(error){
    console.error(`Une erreur est survenue : ${error.message}` )
}
}

// function ajoutDB 
const form = document.querySelector(".form-add-work")
form.addEventListener("submit", addWork)

//WORK PREVIEW 


const workPreview = function(e){
    const input = document.querySelector("form input")
    const file = input.files[0]
    if(file){
        const formFilesContainer = document.querySelector(".form-files")
        const formFiles = [...formFilesContainer.children];
        formFiles.forEach(f=> f.classList.add("hidden-for-preview"))
        
        
        const imageFile = document.createElement("img")
        imageFile.src = URL.createObjectURL(file)
        imageFile.alt = "Aperçu de l'image selectionné"
        imageFile.classList.add("preview-image")
        
        
        formFilesContainer.appendChild(imageFile)
    }
}

const input = document.querySelector("form input")
input.addEventListener("change", workPreview )
    