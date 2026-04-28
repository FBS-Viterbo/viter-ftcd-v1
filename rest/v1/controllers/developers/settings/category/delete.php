<?php

// check database connection
$conn = null;
$conn = checkDBConnection();

// use model
$val = new Category($conn);

if (array_key_exists("id", $_GET)) {
    $val->category_aid = $_GET['id'];

    // validate id
    checkId($val->category_aid);

    // execute delete
    $query = checkDelete($val);

    http_response_code(200);
    returnSuccess($val, "Category Deleted", $query);
}

// return 404 if endpoint not available
checkEndpoint();