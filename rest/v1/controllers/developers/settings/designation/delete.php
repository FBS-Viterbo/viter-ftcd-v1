<?php

// check database connection
$conn = null;
$conn = checkDBConnection();

// use model
$val = new Designation($conn);

if (array_key_exists("id", $_GET)) {
    $val->designation_aid = $_GET['id'];

    // validate id
    checkId($val->designation_aid);

    // execute delete
    $query = checkDelete($val);

    http_response_code(200);
    returnSuccess($val, "Designation Delete", $query);
}

// return 404 if endpoint not available
checkEndpoint();