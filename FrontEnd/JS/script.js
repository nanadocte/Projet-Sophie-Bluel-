async function getWorks() { 
    const response = await fetch("http://localhost:5678/api/works"); 
    const works = await response.json(); 
    const gallery = document.querySelector(".gallery"); 
    console.log(works)

    works.forEach(element => { 
        const figure = document.createElement("figure"); 
        const img = document.createElement("img"); 
        const figcaption = document.createElement("figcaption"); 
        img.setAttribute("src", element.imageUrl); 
        img.setAttribute("alt", element.title); 
        figcaption.innerText = element.title; 
        gallery.appendChild(figure); 
        figure.appendChild(img); 
        figure.appendChild(figcaption); 
    }); 
} 
getWorks()