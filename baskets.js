// baskets.js: s'applique seulement sur le fichier baskets.html

/**
 * ******************** UTILISATION DES DONNEES .JSON ********************
 * Cette partie permet de récupérer les données du JSON et d'utiliser toutes les fonctions qui en ont besoin.
 */

//Je recupère le fichier JSON
fetch("./assets/donneesProduits/baskets.json")
    //j'attends d'avoir la réponse du fichier JSON:
    .then(res => {
        return res.json()
    })
    //et une fois que oui on lance les fonctions:
    .then(data => {
        //ici j'ai accés à baskets.json
        //J'appelle la fonction qui construit le template
        construitMonTemplate(data)
        //j'apelle la fonction qui trie les articles
        trierCroiDecrois(data)
    })

/**
 * ******************** CONSTRUCTION DU TEMPLATE BASKETS ********************
 * Ce script construit le template pour chaque article à partir des données du .json
 */

//Je récupère la zone où je veux que mon template soit implanté:
let zone = document.getElementById('zone-baskets')

/**
 * Rôle: construire un template avec tous les articles.
 * @param {array} donnees (dans ce cas les données du .json)
 * Ne retourne rien
 */
function construitMonTemplate(donnees) {
    // Efface la zone:
    zone.innerHTML = ""
    //pour tous les élements du tableau:
    donnees.forEach(donnee => {
        //j'insère le template dans la zone en fonction des données:
        //google outils d'aide au balisage pour le référencement:
        zone.innerHTML += `<article itemscope itemtype="http://schema.org/Article" class="card-modele">
        <a href="./details.html" title="Vers la page de l'article">
        <div class="img-modele mAuto">
            <img itemprop="image" src="./assets/imagesProduits/${donnee.photo}" alt="photo du modèle de chaussure">
        </div>
        <div class="text-modele flex no-wrap justify-between align-center mB20">
            <h6 itemprop="name">${donnee.nom}</h6>
            <p class="texte-right w70" itemprop="articleSection">${donnee.prix} €</p>
        </div>
        <div>
            <p>${donnee.description}</p>
        </div>
        </a>
    </article>`
    })
}

/**
 * ************************************ TRIER PRIX ********************************************
 * Ce script permet de trier les cartes en fonction de leur prix: croissant ou décroissant.
 * Fonctionne obligatoirement avec la fonction construitMonTemplate.
 */

/**
 * Rôle: Trier les données en fonction du choix utilisateur:
 * @param {array} donnees (dans ce cas les données du .json)
 * Ne retourne rien
 */
function trierCroiDecrois(donnees) {
    // Je recupère l'input de tri:
    let tri = document.getElementById('tri');
    //J'écoute son changement:
    tri.addEventListener('change', function () {
        // je crée un nouveau tableau des données:
        let donneesTriees = [...donnees]
        // Si choix option1 (croissant):
        if (tri.value === 'option1') {
            // alors trier le tableau donneesTriees par ordre croissant
            // Si la différence entre les valeurs des prix de deux éléments est négative alors positionné croissant dans le tableau.
            donneesTriees.sort((a, b) => a.prix - b.prix)
        }
        // si choix option2 (decroissant):
        else if (tri.value === 'option2') {
            // alors trier le tableau donneesTriees par ordre decroissant
            // si la différence entre les valeurs des prix de deux éléments inversé est négative alors positionné decroissant dans le tableau.
            donneesTriees.sort((a, b) => b.prix - a.prix)
        }
        // Je lance la fonction qui affichera les cartes dans l'ordre donné par le nouveau tableau
        construitMonTemplate(donneesTriees)
    });
}