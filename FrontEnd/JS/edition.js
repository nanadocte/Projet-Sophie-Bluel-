
// Mode edition 
export function affichageEdition (){
if (localStorage.getItem("token")){
    const editor = document.querySelectorAll(".hidden")
    editor.forEach(element => {
        element.classList.add("visible")
        element.classList.remove("hidden")
    })
    const publicElements = document.querySelectorAll(".visible.public-element");
    publicElements.forEach(btn => {
        btn.classList.remove("visible");
        btn.classList.add("hidden");
    });
    
}
else return
}


export function logOut(){
    const lienLogOut = document.querySelector(".logout")
    lienLogOut.addEventListener("click", ()=> {
        localStorage.removeItem("token")
        window.location.reload();
    })
}