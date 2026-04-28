<?php

// check database connection
$conn = null;
$conn = checkDBConnection();

// use model
$val = new Notification($conn);

if (array_key_exists("id", $_GET)) {
    $val->notification_aid = $_GET['id'];

    // validate id
    checkId($val->notification_aid);

    // execute delete
    $query = checkDelete($val);

    http_response_code(200);
    returnSuccess($val, "Notification Delete", $query);
}

// return 404 if endpoint not available
checkEndpoint();