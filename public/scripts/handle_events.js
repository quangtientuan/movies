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

  // function divClick(element) {
  //     // alert('div click');
  //     // Rediriger vers une nouvelle URL
  //     window.location.href = "https://www.google.com";
  // }

  function divClick(element) {
    // alert('div click');
    // Rediriger vers une nouvelle URL
    // window.location.href = "http://localhost:3020/api/movies/createMovie";

    /////////////////////////////////////////////////////////////////////////////////
    // Exemple avec l'API Fetch pour une redirection avec une méthode HTTP spécifique
    fetch("http://localhost:3020/api/movies/detailMovie", {
      method: "POST", // Utilisez la méthode HTTP souhaitée (GET, POST, PUT, DELETE, etc.)
      // Autres options de requête comme headers, body, etc.
    })
      .then(response => {
        // Traitez la réponse si nécessaire
        // Ensuite, effectuez la redirection
        window.location.href = response.url;
      })
      .catch(error => {
        console.error("Erreur lors de la requête :", error);
      });
  };
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

