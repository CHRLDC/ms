//app.js : permet d'ajouter des fonctionnalités communes à toutes les pages:
/**
 * ******************** MENU BURGER ********************
 * Ce sript permet de basculer le menu burger dans le but
 * d'un menu responsive
 */

// Je récupère les éléments du menu burger:
let burgerMenu = document.getElementById('burger-menu')//le menu
let fenetreMenu = document.getElementById('fenetre-menu')//la fenêtre
// J'ajoute un écouteur d'événement pour le clic sur le menu burger:
burgerMenu.addEventListener('click', function () {
    // Je bascule la classe "open" lorsque le menu est cliqué:
    burgerMenu.classList.toggle('open');
    // Si le menu gurger a la classe open:
    if (burgerMenu.classList.contains('open')) {
        // J'ajoute d-block à la fenêtre:
        fenetreMenu.classList.add('d-block');
        fenetreMenu.classList.remove('d-none');
    } else {
        //sinon j'enlève d-block à la fenêtre:
        fenetreMenu.classList.remove('d-block');
        fenetreMenu.classList.add('d-none');
    }
});

/**
 * ******************** CARTE DANS LE FOOTER ********************
 * * Ce script affiche une carte sur le footer, centrée sur le magasin et avec un 
 * * marqueur pour le localiser
 */
//Map et données pour son affichage:
let map = L.map('map').setView([45.43389, 4.39], 25);
// librairie : https://leafletjs.com/ qui affiche la carte sur la page
let Esri_WorldImagery = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
}).addTo(map);
//Affichage du marqueur sur la map:
let marker = L.marker([45.43389, 4.39]).addTo(map);
marker.bindTooltip("<p>M'S Saint-Etienne</p>").openTooltip();

/**
 * ******************** ACCESSIBILITE FONT ********************
 *  * Ce script gère l'accessibilité des polices en permettant à l'utilisateur de basculer pour tous les élements dans le body:
 * entre la police 'Luciole' et les polices par défaut du site.
 */
// Je récupère le bouton d'accessibilité
let btnAcc = document.getElementById("btn-acc");
let btnAcc2 = document.getElementById("btn-acc2");
// J'attends que le DOM soit chargé:
document.addEventListener("DOMContentLoaded", function () {
    // origine:
    let fontLuciole = ""
    // Ajoute un écouteur d'événements pour le clic sur le bouton
    btnAcc.addEventListener('click', toggleFont)
    btnAcc2.addEventListener('click', toggleFont)
    // Fonction pour basculer entre la police luciole et les polices par défaut:
    function toggleFont() {
        // Je récupère tous les élements du body:
        let elements = document.querySelectorAll("body *")
        // Pour chacuns de ces élements:
        for (let i = 0; i < elements.length; i++) {
            // Vérifie si la police actuelle est luciole
            if (fontLuciole) {
                // Si c'est le cas, enlève la balise style-font:
                elements[i].style.fontFamily = ""
            } else {
                // Sinon, ajouter la balise style-font luciole:
                elements[i].style.fontFamily = "Luciole"
            }
        }
        //basculer la police
        fontLuciole = !fontLuciole
    }
});