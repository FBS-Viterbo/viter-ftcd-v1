<?php

// set http header
require '../../../../core/header.php';

// use needed functions
require '../../../../core/functions.php';

// use model
require '../../../../models/developers/settings/notification/Notification.php';

$conn = null;
$conn = checkDBConnection();

$val = new Notification($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {

    // check payload
    checkPayload($data);

    $val->notification_aid = $_GET['id'];
    $val->notification_is_active = trim($data['isActive']);
    $val->notification_updated = date("Y-m-d H:i:s");

    // validate id
    checkId($val->notification_aid);

    $query = checkActive($val);

    http_response_code(200);
    returnSuccess($val, 'notification active', $query);
}

// return 404 if endpoint not available
checkEndpoint();