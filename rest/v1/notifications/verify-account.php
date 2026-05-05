<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

include_once __DIR__ . "/mail-config.php";
include_once __DIR__ . "/templates/verify-account.php";

function cleanMailDebugValue($value)
{
	if (is_string($value)) {
		if (function_exists('mb_convert_encoding')) {
			$value = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
		} else {
			$value = preg_replace('/[^\x09\x0A\x0D\x20-\x7E]/', '', $value);
		}

		$value = preg_replace('/[^\x09\x0A\x0D\x20-\x7E]/', '?', $value);
		return strlen($value) > 500 ? substr($value, 0, 500) . '...' : $value;
	}

	return $value;
}

function getMailDebugInfo($mail = null, $smtpDebug = [])
{
	$host = defined('HOST') ? HOST : '';
	$port = defined('PORT') ? PORT : '';
	$connection = [
		"success" => false,
		"error" => "Skipped because HOST or PORT is missing.",
	];

	if ($host !== '' && $port !== '') {
		$errorNumber = 0;
		$errorMessage = '';
		$socket = @fsockopen($host, (int) $port, $errorNumber, $errorMessage, 3);

		if ($socket) {
			fclose($socket);
			$connection = [
				"success" => true,
				"error" => "",
			];
		} else {
			$connection = [
				"success" => false,
				"error" => trim("{$errorNumber} {$errorMessage}"),
			];
		}
	}

	return [
		"config" => [
			"host" => $host ?: "missing",
			"port" => $port ?: "missing",
			"smtp_secure" => defined('SMTPSECURE') ? SMTPSECURE : "missing",
			"username" => defined('USERNAME') ? USERNAME : "missing",
			"password_set" => defined('PASSWORD') && PASSWORD !== "",
			"from" => defined('FROM') ? FROM : "missing",
			"root_domain" => defined('ROOT_DOMAIN') ? ROOT_DOMAIN : "missing",
			"images_url" => defined('IMAGES_URL') ? IMAGES_URL : "missing",
		],
		"php" => [
			"openssl_loaded" => extension_loaded("openssl"),
			"sockets_loaded" => extension_loaded("sockets"),
			"allow_url_fopen" => ini_get("allow_url_fopen"),
			"openssl_cafile" => ini_get("openssl.cafile"),
			"curl_cainfo" => ini_get("curl.cainfo"),
		],
		"dns" => [
			"host" => $host ?: "missing",
			"resolved_ip" => $host ? gethostbyname($host) : "missing",
		],
		"socket_connection" => $connection,
		"phpmailer" => [
			"error_info" => $mail ? $mail->ErrorInfo : "",
			"smtp_debug" => $smtpDebug,
		],
	];
}

function sendEmail($password_link, $name, $email, $key)
{
	$mail = null;
	$smtpDebug = [];
	//trigger exception in a "try" block
	try {
		$mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Timeout = 10;
		$mail->SMTPDebug = SMTP::DEBUG_SERVER;
		$mail->Debugoutput = function ($message, $level) use (&$smtpDebug) {
			$smtpDebug[] = [
				"level" => $level,
				"message" => cleanMailDebugValue(trim($message)),
			];
		};
		$mail->Host = HOST; // SiteGround
		$mail->Port = PORT;
		$mail->SMTPSecure = SMTPSECURE;
		$mail->SMTPOptions = [
			"ssl" => [
				"crypto_method" => STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT,
			],
		];
		$mail->SMTPAuth = true;
		$mail->Username =  USERNAME; // if gmail use your gmail email
		$mail->Password = PASSWORD; // if gmail use your email password
		$mail->Subject = VERIFY_ACCOUNT;
		$mail->setFrom(USERNAME, FROM);
		$mail->isHTML(true);
		$mail->Body = getHtmlVerifyAccount(
			$password_link,
			$name,
			$email,
			$key,
			ROOT_DOMAIN,
			IMAGES_URL
		);

		// if email is not empty
		// send email
		if ($email != "") {
			$mail->addAddress($email);
			if ($mail->Send()) {
				return array(
					"mail_success" => true,
					"error" => "No Error.",
					"email" => $email,
					"mail_debug" => getMailDebugInfo($mail, $smtpDebug),
				);
			} else {
				return array(
					"error" => "Could not send email. Please refresh your page and try again.",
					"mail_success" => false,
					"mail_debug" => getMailDebugInfo($mail, $smtpDebug),
				);
			}
		}
		// if email is empty
		// return error response
		else {
			return array(
				"error" => "No email receiver found!.",
				"mail_success" => false,
				"mail_debug" => getMailDebugInfo($mail, $smtpDebug),
			);
		}
	}
	//catch exception
	catch (Exception $e) {
		$mailError = $mail && $mail->ErrorInfo ? $mail->ErrorInfo : $e->getMessage();
		return array(
			"mail_error" => $mailError,
			"error" => $mailError,
			"mail_success" => false,
			"mail_debug" => getMailDebugInfo($mail, $smtpDebug),
		);
	}
}
