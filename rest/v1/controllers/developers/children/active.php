<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use models
require '../../../models/developers/Children/Children.php';

// store models into variables
$conn = null;
$conn = checkDBConnection();

$val = new Children($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {
    // check data if exist and data is required
    checkPayload($data);

    $val->children_aid = $_GET['id'];
    $val->children_is_active = trim($data['isActive']);
    $val->children_updated = date("Y-m-d H:i:s");

    // validate id
    checkId($val->children_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, 'children active', $query);
}

// return 404 if endpoint not available
checkEndpoint();