<?php

require '../../../core/header.php';
require '../../../core/Encryption.php';
require '../../../core/functions.php';
require '../../../models/developers/donor/Donor.php';

$conn = null;
$conn = checkDbConnection();

// model
$val = new Donor($conn);
$encrypt = new Encryption();

// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    // validate data
    checkPayload($data);

    // set password (hashed)
    $val->donor_password = $encrypt->doPasswordHash($data['new_password']);

    // key to identify donor
    $val->donor_key = $data['key'];

    // timestamp
    $val->donor_updated = date("Y-m-d H:i:s");

    // execute update password query
    $query = checkSetPassword($val);

    http_response_code(200);
    returnSuccess($val, "Donor set password", $query);
}

http_response_code(200);
checkAccess();
