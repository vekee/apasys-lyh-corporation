<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Make sure PHPMailer is installed via Composer

$additionalSubject = true;  

if (!empty($_POST) && !empty($_POST['email'])) {

    $respondArray = [];

    // Your own email for receiving messages
    $emailReceiver = "layoutdrop.themes@gmail.com";

    // Setup sender (SMTP Gmail)
    $smtpUser = 'niteshkumawat919@gmail.com'; // 🔑 Replace with your Gmail
    $smtpPass = 'imhsujqkzgpxmfjs';   // 🔐 App password from Gmail (not normal password)

    // Validate email input
    $email = trim($_POST['email']);
    isEmailValid($email); // make sure this function is defined elsewhere

    // Build message
    $messageString = '';
    $post = $_POST;
    if (isset($additionalSubject) && !empty($post['subject'])) {
        $defaultEmailSubject .= $post['subject'];
    }

    foreach ($post as $key => $value) {
        if (!is_array($value)) {
            $fieldName = ucfirst(str_replace('_', ' ', $key));
            $messageString .= "<strong>{$fieldName}:</strong> " . htmlspecialchars($value) . "<br>";
        }
    }

    // PHPMailer config
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtpUser;
        $mail->Password   = $smtpPass;
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Set sender and recipient
        $mail->setFrom($smtpUser, 'Your Website');
        $mail->addAddress($emailReceiver);

        // Headers & content
        $mail->isHTML(true);
        $mail->Subject = $defaultEmailSubject ?? 'New Contact Submission';
        $mail->Body    = $messageString;

        $mail->send();

        $respondArray['status'] = 1;
        $respondArray['message'] = 'Thanks for Contact. We will contact you soon.';
    } catch (Exception $e) {
        $respondArray['status'] = 0;
        $respondArray['message'] = 'Mailer Error: ' . $mail->ErrorInfo;
    }

    // Send response to frontend
    putMessage($respondArray);
}

function putMessage($respondArray){
	echo json_encode($respondArray);
	exit;
}

function isEmailValid($email){
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
		$respondArray['status'] = 0;
		$respondArray['msg'] = 'Please enter valid email address.';
		putMessage($respondArray);
	}
}

function pr($value){
	echo '<pre>';
	print_r($value);
}