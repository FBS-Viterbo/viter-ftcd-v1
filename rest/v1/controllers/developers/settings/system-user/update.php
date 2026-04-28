<?php

$conn = checkDBConnection();
$val = new SystemUser($conn);

if (array_key_exists("id", $_GET)) {

    $val->system_aid = $_GET['id'];

    $val->system_name  = trim($data['system_name'] ?? "");
    $val->system_email = trim($data['system_email'] ?? "");
    $val->system_role  = trim($data['system_role'] ?? "");

    $val->system_updated = date("Y-m-d H:i:s");

    checkId($val->system_aid);

    $query = checkUpdate($val);

    http_response_code(200);
    returnSuccess($val, "System User Update", $query);
}

checkEndpoint();