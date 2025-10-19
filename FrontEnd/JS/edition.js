console.log("hello")

// MOde edition 
export function affichageEdition (){
if (localStorage.getItem("token")){
    const editor = document.querySelectorAll(".hidden")
    editor.forEach(element => {
        element.classList.add("visible")
        element.classList.remove("hidden")
        console.log("Vous etes dans l'editor")
    })
    const publicElements = document.querySelectorAll(".visible.public-element");
    publicElements.forEach(btn => {
        btn.classList.remove("visible");
        btn.classList.add("hidden");
        console.log("Elements public masqués")
    });
    
}
else console.log("Dommage ")
}


export function logOut(){
    const lienLogOut = document.querySelector(".logout")
    lienLogOut.addEventListener("click", ()=> {
        localStorage.removeItem("token")
        window.location.reload();
    })
}