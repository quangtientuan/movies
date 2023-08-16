// Si vous modifiez ce fichier, exécutez "npm run build" pour que votre server utilise la nouvelle version. 
// Sinon le navigateur conserve l'ancienne version en cache.
window.addEventListener("load", function () {
    const fileUpload = document.getElementById('fileUpload');
    const filePath = document.getElementById('filePath');

    fileUpload.addEventListener('change', () => {
        if (fileUpload.files.length > 0) {
            const fileName = fileUpload.files[0].name;
            //filePath.textContent = 'Chemin de l\'image sélectionnée : ' + fileName;
            filePath.value = '/data/uploads/' + fileName;
            console.log(fileFullPath); // Affichez le chemin complet dans la console
        } else {
            filePath.textContent = '';
        }
    });
});



//
// function creerCours(infoCours, listeEtudiant) {
//     var xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//             if (xhr.status === 200) {
//                 console.log(xhr.responseText)
//                 // Appel de la fonction de succès avec la réponse
//             } else {
//                 // Appel de la fonction d'erreur avec le statut de la requête
//             }
//         }
//     };

//     xhr.open("POST", "creerCours", true);

//     xhr.setRequestHeader("Content-Type", "application/json");

//     xhr.send(JSON.stringify({ info: infoCours, liste: listeEtudiant }));

// }

