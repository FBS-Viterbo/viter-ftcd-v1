<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developers/donor/Donor.php';

$conn = null;
$conn = checkDbConnection();

// model
$val = new Donor($conn);

// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    // check if key exists in URL
    if (array_key_exists('key', $_GET)) {

        $val->donor_key = $_GET['key'];

        $query = checkReadKey($val);

        http_response_code(200);
        getQueriedData($query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();