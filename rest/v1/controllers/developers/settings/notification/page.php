<?php

// set http header
require '../../../core/header.php';

// use needed functions
require_once '../../../core/functions.php';

// use model
require_once '../../../models/developers/settings/notification/Notification.php';

// Explicit CORS headers for all requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
header("Content-Type: application/json; charset=UTF-8");

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// database connection
$conn = null;
$conn = checkDBConnection();

$val = new Notification($conn);

// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// Check if Authorization header is present
if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

// Check if start parameter exists
if (!array_key_exists('start', $_GET)) {
    http_response_code(400);
    echo json_encode(["error" => "Missing start parameter"]);
    exit;
}

// Validate payload
if (empty($data) || !is_array($data)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request body"]);
    exit;
}

// Set values
$val->start = (int)$_GET['start'];
$val->total = 10;

// filters
$val->notification_is_active = isset($data['filterData']) ? $data['filterData'] : '';
$val->search = isset($data['searchValue']) ? $data['searchValue'] : '';

// validation
checkLimitId($val->start, $val->total);

// queries
$query = checkReadLimit($val);
$total_result = checkReadAll($val);

http_response_code(200);

checkReadQuery(
    $query,
    $total_result,
    $val->total,
    $val->start
);