<?php

$conn = checkDBConnection();
$val = new Children($conn);

if (array_key_exists("id", $_GET)) {

    $val->children_aid = $_GET['id'];

    $val->children_is_active = isset($data['children_is_active']) && $data['children_is_active'] ? 1 : 0;
    $val->children_full_name = trim($data['children_full_name'] ?? "");
    $val->children_birthday = $data['children_birthday'] ?? "";
    $val->children_story = $data['children_story'] ?? "";
    $val->children_donation_amount_limit = $data['children_donation_amount_limit'] ?? 0;
    $val->children_is_residence = isset($data['children_is_residence']) && $data['children_is_residence'] ? 1 : 0;

    $val->children_updated = date("Y-m-d H:i:s");

    checkId($val->children_aid);

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Children Update", $query);
}

checkEndpoint();