//index.js: s'applique seulement sur le fichier index.html

/**
 * ************************* FORMULAIRE *************************
 * Ce script permet de valider le formulaire et de l'envoyer si tout est OK.
 */

//récupérer le formulaire:
let form = document.getElementById("form")
//écouter la soumission du formulaire:
form.addEventListener("submit", (e) => {
    //j'arrête le comportement par défaut:
    e.preventDefault()
    //données clients récupérées:
    let nom = document.getElementById("nom")
    let prenom = document.getElementById("prenom")
    let mail = document.getElementById("email")
    let objet = document.getElementById("objet")
    let reference = document.getElementById("reference")
    let message = document.getElementById("message")
    let zoneRef = document.getElementById("zone-ref")
    //Reprendre tous les tests:
    let test1 = testNom(nom)
    let test2 = testNom(prenom)
    let test3 = checkMail(mail)
    let test4 = checkChoix(objet)
    let test5 = ""
    //Si le champ reférence est visible:
    if (!zoneRef.classList.contains("d-none")) {
        //on attends le retour de la fonction concernée:
        test5 = checkRef(reference);
        //sinon on débloque le retour en true car pas visible
    } else {
        test5 = true
    }
    let test6 = testMessage(message)

    //Si tous les tests retournent TRUE:
    if (test1 === true && test2 === true && test3 === true && test4 === true && test5 === true && test6 === true) {
        //afficher un message de confirmation:
        check.classList.remove("d-none")
        //supprimer le bouton:
        envoi.remove("d-none")
        //vider le formulaire:
        form.reset()
        // Attendre 3 secondes avant d'envoyer le formulaire
        setTimeout(function () {
            // Soumettre le formulaire
            form.submit();
        }, 3000);
    } else {
        //permet un affichage de message d'erreur en console si impossible:
        console.log("transfert impossible")
    }
})
/**
 *  **************************************CONDITIONS**************************************
 * Ces scripts permettent d'écouter ce que l'utilisateur a saisit et contrôler si les conditions sont respectées
 * tous renvoient TRUE si OK sinon FALSE
 */

//Je récupère tout les champs du formulaire:
let nom = document.getElementById("nom")
let prenom = document.getElementById("prenom")
let mail = document.getElementById("email")
let objet = document.getElementById("objet")
let reference = document.getElementById("reference")
let message = document.getElementById("message")
let check = document.getElementById("msg-check")
let envoi = document.getElementById("envoi")

//j'écoute le changement de nom:
nom.addEventListener("change", () => {
    //Si il y a un changement de nom, on testera le nom
    testNom(nom)
})
//j'écoute le changement de prenom:
prenom.addEventListener("change", () => {
    //Si il y a un changement de nom, on testera le prenom
    testNom(prenom)
})
//j'écoute le changement de mail:
mail.addEventListener("change", () => {
    //Si il y a un changement de nom, on testera le mail
    checkMail(mail)
})
//j'écoute le changement de l'objet:
objet.addEventListener("change", () => {
    //Si il y a un changement de nom, on testera l'objet
    checkChoix(objet)
})
//j'écoute le changement du message:
message.addEventListener("change", () => {
    //Si il y a un changement de nom, on testera le message
    testMessage(message)
})

//Partie à afficher si option 3 ou option 4 sont sélectionnées:
let zoneRef = document.getElementById("zone-ref")
//Si option 3 ou 4 sélectionné dans le select:
//j'écoute le changement de objet:
objet.addEventListener("change", () => {
    //le il retourne option3 ou option4:
    if (objet.value === "option3" || objet.value === "option4") {
        //J'affiche la zone
        zoneRef.classList.remove("d-none")
        //j'écoute ce qu'a écrit l'utilisateur:
        reference.addEventListener("change", () => {
            //et je check la référence:
            checkRef(reference)
        })
    } else {
        //sinon je ne  l'affiche pas
        zoneRef.classList.add("d-none");
    }
})

/**
 * ********************************* FUNCTION **************************************
 * Ma librairie de fonctions qui marchent bien COOOOOL:
 */

/**
 * Rôle: Vérifie la présence, la longueur du message, et anti-script.
 * @param {object} balise 
 * @returns {boolean} true si tout est ok, sinon false
 */
function testMessage(balise) {
    //Si la valeur de la balise est vide:
    if (balise.value == "") {
        // Lancer la fonction afficheErreur:
        afficheErreur(balise.id, "Votre message est vide")
        //et retourne false
        return false
        // si le champs ne comporte du code
    } else if (hasCode(balise.value)) {
        afficheErreur(balise.id, "Vous ne pouvez pas écrire de script ici")
        return false
        // si le message n'est plus long que 500 caractères
    } else if (balise.value.length > 500) {
        afficheErreur(balise.id, "Votre message est trop long")
        return false
    }
    enleveErreur("message")
    return true
}

/**
 * Rôle: Vérifie si la référence est au format xxx-123456
 * @param {object} ref ajouter .value pour référence à controler
 * @returns {boolean}
 */
function checkRef(ref) {
    // Expression régulière pour valider le format xxx-123456:
    let code = /^[a-zA-Z]{3}-\d{6}$/;
    // Vérifie si la chaîne correspond au format requis:
    if (code.test(ref.value)) {
        enleveErreur(ref.id);
        return true;
    } else {
        afficheErreur(ref.id, "Référence non valide.");
        return false;
    }
}

/**
 * Rôle: Vérifie une adresse mail est présente et valide
 * @param {object} email  Adresse mail à vérifier
 * @returns {boolean}  Renvoie true si l'adresse e-mail est valide, sinon false
 */
function checkMail(email) {
    // Expression régulière pour valider une adresse e-mail:
    let addEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // Si l'adresse e-mail est valide:
    if (addEmail.test(email.value)) {
        enleveErreur(email.id);
        return true;
    } else if (email.value === "") {
        // Teste si le champ est vide
        afficheErreur(email.id, "Merci de saisir une adresse e-mail type exemple@mail.fr");
        return false;
    } else {
        // Si elle ne l'est pas, afficher une erreur:
        afficheErreur(email.id, "Adresse e-mail non valide.");
        return false;
    }
}

/**
 * Rôle: Vérifie que le nom n'est pas vide, sans mauvais caractères ni code et assez long
 * @param {object} balise 
 * @returns {boolean} return true si le champs est correct, sinon false
 */
function testNom(balise) {
    // si le champ est vide
    if (balise.value === "") {
        // affiche l'erreur
        afficheErreur(balise.id, "Ce champ ne peut pas être vide");
        return false;
    } else if (/[^a-zA-ZÀ-ÿ'-\s]/.test(balise.value)) {
        // Expression régulière qui contrôle les caractères spéciaux et chiffres.
        afficheErreur(balise.id, "Caractères non autorisés");
        return false;
    } else if (hasCode(balise.value)) {
        // est-ce que notre utilisateur n'est pas en train d'injecter du code
        afficheErreur(balise.id, "Vous avez injecté du code, pas bien !");
        return false;
    } else if (balise.value.length > 50) {
        // est-ce que le texte est trop long
        afficheErreur(balise.id, "Vous avez tapé un nom trop long !");
        return false;
    } else {
        // Si tout est ok:
        enleveErreur(balise.id);
        return true;
    }
}

/**
 * fonction cherche dans une chaine s'il y a une balise script
 * @param {string} text 
 * @returns true : y'a du code
 */
function hasCode(text) {
    // Expression régulière qui contrôle si une balise script
    let reg = /<script/
    return reg.test(text)
}

/**
 * Rôle: contrôle qu'un select soit selectionné
 * @param {object} balise 
 * @returns true si l'element est selectionné sinon false
 */
function checkChoix(balise) {
    if (balise.value === "") {
        afficheErreur(balise.id, "Vous devez choisir un " + balise.id);
        return false
    } else
        enleveErreur(balise.id);
    return true
}

/**
* Rôle: Afficher une erreur: mettre une bordure sur le bon input et afficher le paragraphe d'erreur associé
* @param {object} id de l'input dans lequel il y a une erreur
* @param {string} messageErreur à afficher
*/
function afficheErreur(id, messageErreur) {
    let input = document.getElementById(id)
    input.classList.add("input-error")
    let p = document.getElementById("error-" + id)
    p.innerText = messageErreur
    p.classList.remove("d-none")
}

/**
* Rôle: Enlever une erreur: enlever la bordure sur le bon input et enlever le paragraphe d'erreur associé
* @param {object} id de l'input dans lequel il y a une erreur
*/
function enleveErreur(id) {
    let input = document.getElementById(id)
    input.classList.remove("input-error")
    let p = document.getElementById("error-" + id)
    p.innerText = ""
    p.classList.add("d-none")
}