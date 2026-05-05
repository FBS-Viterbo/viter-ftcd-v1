<?php

// FOR LOCAL COMPUTER CONFIGURATION
define('WEB_API_KEY_PATH', require __DIR__ . "/../../../apikey.php");

// FOR PRODUCTION/DEPLOYMENT
// define('WEB_API_KEY_PATH', require $_SERVER['DOCUMENT_ROOT'] . "/../../apikey.php";

// FOR SET EMAIL
define('FROM', 'HRIS');
define('VERIFY_ACCOUNT', 'Account Verification');
define('RESET_PASSWORD', 'Reset Password');
define('VERIFY_EMAIL', 'Verify Email');
// // GROUP OPTIX HOSTINGER EMAIL
define("USERNAME", "noreply@groupoptix.com");
define("PASSWORD", "1s$42*Gs1CvbEzsI");
// // GROUP OPTIX HOSTINGER
define("HOST", "smtp.hostinger.com");
define("PORT", 587);
define("SMTPSECURE", "tls");

// ROOT DOMAIN
// LOCAL COMPUTER
define('ROOT_DOMAIN', 'http://localhost:5173');
define('IMAGES_URL', 'http://localhost:5173/img');

// PRODUCTION 
// define('ROOT_DOMAIN', 'http://localhost/react-vite/viter-hris');
// define('IMAGES_URL', 'http://localhost/react-vite/viter-hris/img');