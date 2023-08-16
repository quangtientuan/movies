// Si vous modifiez ce fichier, exécutez "npm run build" pour que votre server utilise la nouvelle version. 
// Sinon le navigateur conserve l'ancienne version en cache.
window.addEventListener("load", function () {
    const fileInput = document.getElementById('fileInput');
    const filePath = document.getElementById('filePath');

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            //filePath.textContent = 'Chemin de l\'image sélectionnée : ' + fileName;
            filePath.value = 'Chemin de l\'image sélectionnée : ' + fileName;
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

