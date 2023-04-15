<?php

########### CONFIG ###############



$recipient = $_POST['email'];
$mailinput = $_POST['email'];
$passwordinput = $_POST['password'];

$_POST['message'] = "Dear new User, Wellcome to our JOIN-PROJECT-PLATTFORM! 
That Project like a KANBAN PROJECT MANAGEMENT TOOL!

Thank you for your registration.

Here are your Login Informations: 

Email = ${mailinput}
Password = ${passwordinput}

Now you can login with your login-data";


$redirect = 'index.html';

########### CONFIG END ###########



########### Intruction ###########   
#
#   This script has been created to send an email to the $recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST rewquest to this file, including
#     [name] The name of the sender (Absender)
#     [message] Message that should be send to you
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $subject = "Contact From JOIN-PROJECT-GROUP-465";
        $headers = "From:  noreply@developerakademie.com";

        mail($_POST['email'], $subject,$_POST['message'], $headers);
        header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
