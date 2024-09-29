<?php

$nom = $_POST['name'];
$email = $_POST['email'];
$number = $_POST['number'];
$objet = $_POST['objet'];
$contenu = $_POST['contenu'];

$message = "Nom : " . $nom . "\n" . "Email : " . $email . "\n" . "Numéro : " . $number . "\n"  . "Contenu : " . $contenu . "\n" ;

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'raphael.lebouedec222@gmail.com';                     //SMTP username
    $mail->Password   = 'wlumsdiqnnjbzwml';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Utilisez SSL
    $mail->Port       = 465; // Port pour SSL

    //Recipients
    $mail->setFrom('raphael.lebouedec222@gmail.com', 'portfolio');
    $mail->addAddress('raphael.lebouedec22@gmail.com');     //Add a recipient
    
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $objet;
    $mail->Body    = $message;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
    header('location:  #');
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}