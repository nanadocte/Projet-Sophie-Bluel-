



const formulaire = document.querySelector(".formulaire-login")

// Vérification de connexion  

 formulaire.addEventListener("submit", async (event)=> {

    event.preventDefault()

    const emailPassword = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=password]").value,
    };
    
    const chargeUtile = JSON.stringify(emailPassword)
    const response = 
        await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        });

    // Récupération de données
    const data = await response.json()
    
    // Redirection 
    if (!data.token) {
        // Ajouter une class pour le styel 
        const input = document.querySelectorAll(".formulaire-login input")
        input.forEach(input => input.classList.add("wrong-password"))

        if (!formulaire.querySelector("p")){
        const erreur = document.createElement("p")
            erreur.textContent 
                = "Attention, les coordonnées entrées sont incorrectes"
            formulaire.appendChild(erreur)}
        
    }
    else window.location.href="../index.html"
    localStorage.setItem("token", data.token)
})



