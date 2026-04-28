<?php

// check database connection
$conn = null;
$conn = checkDBConnection();

// use model
$val = new SystemUser($conn);

if (array_key_exists("id", $_GET)) {
    $val->system_aid = $_GET['id'];

    // validate id
    checkId($val->system_aid);

    // execute delete
    $query = checkDelete($val);

    http_response_code(200);
    returnSuccess($val, "System User Delete", $query);
}

// return 404 if endpoint not available
checkEndpoint();