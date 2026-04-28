<?php

$conn = checkDBConnection();

$val = new Category($conn);

// ALWAYS ACTIVE ON FIRST INSERT
$val->category_is_active = 1;

$val->category_name = trim($data['category_name'] ?? "");
$val->category_description = trim($data['category_description'] ?? "");

$val->category_created = date("Y-m-d H:i:s");
$val->category_updated = date("Y-m-d H:i:s");

$query = checkCreate($val);

http_response_code(200);
returnSuccess($val, "Category Created", $query);