export function openModal (){
    const modifier = document.querySelector(".modifier")
    modifier.addEventListener("click", ()=>{
            const modal = document.querySelector(".modal")
            modal.style.display = null
    
        })
        getWorksModal(works)
}

const response = await fetch(`http://localhost:5678/api/works`)
const works = await response.json()


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
        trash.classList.add("delete")
        sectionImg.appendChild(workContainer)
        workContainer.appendChild(trash)
        workContainer.appendChild(img);
    })
}