//details.js: s'applique seulement sur le fichier details.html

/**
 * ***************** CAROUSSEL SWIPER.JS *****************
 * Ce script génère un carrousel à partir de la librairie Swiper.js
 * balise CSS et JS dans le HTML 
 * avec les données imagesProduits
 */

//Ce script donne les options de carrousel à partir de la librairie Swiper.js
let swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    // If we need pagination
    pagination: {
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
    },
});

//Je récupère tous les boutons de couleur:
let btnBlue = document.getElementById("btn-blue")
let btnViolet = document.getElementById("btn-purple")
let btnRed = document.getElementById("btn-red")
let btnGreen = document.getElementById("btn-green")
//j'écoute le clic sur chaquun des boutons:
//le bleu:
btnBlue.addEventListener("click", () => {
    //je passe à la slide correspondante à la couleur bleu:
    swiper.slideTo(0)
})
//le violet:
btnViolet.addEventListener("click", () => {
    //je passe à la slide correspondante à la couleur violet:
    swiper.slideTo(1)
})
//le rouge:
btnRed.addEventListener("click", () => {
    //je passe à la slide correspondante à la couleur rouge:
    swiper.slideTo(2)
})
//le vert:
btnGreen.addEventListener("click", () => {
    //je passe à la slide correspondante à la couleur vert:
    swiper.slideTo(3)
})