<?php

$conn = checkDBConnection();

$val = new SystemUser($conn);

// ALWAYS ACTIVE ON FIRST INSERT
$val->system_is_active = 1;

$val->system_name  = trim($data['system_name'] ?? "");
$val->system_email = trim($data['system_email'] ?? "");
$val->system_role  = trim($data['system_role'] ?? "");

$val->system_created = date("Y-m-d H:i:s");
$val->system_updated = date("Y-m-d H:i:s");

$query = checkCreate($val);

http_response_code(200);
returnSuccess($val, "System User Create", $query);