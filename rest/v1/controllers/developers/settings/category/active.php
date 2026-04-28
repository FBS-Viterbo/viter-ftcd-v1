<?php

// set http header
require '../../../../core/header.php';

// use needed functions
require '../../../../core/functions.php';

// use model
require '../../../../models/developers/settings/category/Category.php';

$conn = null;
$conn = checkDBConnection();

$val = new Category($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {

    // check payload
    checkPayload($data);

    $val->category_aid = $_GET['id'];
    $val->category_is_active = trim($data['isActive']);

    // validate id
    checkId($val->category_aid);

    $query = checkActive($val);

    http_response_code(200);
    returnSuccess($val, 'category status updated', $query);
}

// return 404 if endpoint not available
checkEndpoint();