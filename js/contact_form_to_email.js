console.log("Fichier JS chargé correctement");

function emailSend() {
    var userName = document.getElementById('name').value;
    var phone = document.getElementById('number').value;
    var email = document.getElementById('email').value;
    var objet = document.getElementById('objet').value;
    var contenu = document.getElementById('contenu').value;

    var messageBody = "Name: " + userName +
        "<br/> Phone: " + phone +
        "<br/> Email: " + email+
        "<br/> objet: " + objet+
        "<br/> <br/> contenu: " + contenu;

    console.log("Contenu de l'e-mail à envoyer:", messageBody);

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "raphael.lebouedec222@gmail.com",
        Password: "B771CDE84A6A6A6F5730AFC16B19586CED78",
        To: 'raphael.lebouedec222@gmail.com', 
        From: "raphael.lebouedec222@gmail.com",
        Subject: objet,
        Body: messageBody,
        Port: 2525
    }).then(
        function (message) {
            console.log("Résultat de l'envoi de l'e-mail:", message);
            if (message === 'OK') {
                swal("Succès", "Votre email a été envoyé !", "success");
            } else {
                swal("Erreur", "Echec de l'envoie du mail: " + message, "error");
            }
        }
    ).catch(function (error) {
        console.log("Erreur lors de l'envoi:", error);
        alert("Une erreur inattendue s'est produite: " + error);
    });
}

