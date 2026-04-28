<?php

//set http header
require '../../../../core/header.php';
// use needed funcions
require '../../../../core/functions.php';
// use model
require '../../../../models/developers/settings/system-user/SystemUser.php';

$conn = null;
$conn = checkDBConnection();

$val = new SystemUser($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {

    // check payload
    checkPayload($data);

    $val->system_aid = $_GET['id'];
    $val->system_is_active = trim($data['isActive']);
    $val->system_updated = date("Y-m-d H:i:s");

    // validate id
    checkId($val->system_aid);

    $query = checkActive($val);

    http_response_code(200);
    returnSuccess($val, 'system user active', $query);
}

// return 404 if endpoint not available
checkEndpoint();