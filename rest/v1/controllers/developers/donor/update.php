<?php

$conn = checkDBConnection();
$val = new Donor($conn);

if (array_key_exists("id", $_GET)) {
    $val->donor_aid       = $_GET['id'];
    $val->donor_is_active = isset($data['donor_is_active']) && $data['donor_is_active'] ? 1 : 0;
    $val->donor_first_name  = trim($data['donor_first_name'] ?? "");
    $val->donor_middle_name = trim($data['donor_middle_name'] ?? "");
    $val->donor_last_name   = trim($data['donor_last_name'] ?? "");
    $val->donor_email       = $data['donor_email'] ?? "";
    $val->donor_stripe      = $data['donor_stripe'] ?? 0;
    $val->donor_contact     = $data['donor_contact'] ?? "";
    $val->donor_address     = $data['donor_address'] ?? "";
    $val->donor_city        = $data['donor_city'] ?? "";
    $val->donor_state       = $data['donor_state'] ?? "";
    $val->donor_country     = $data['donor_country'] ?? "";
    $val->donor_zip         = $data['donor_zip'] ?? "";
    $val->donor_updated     = date("Y-m-d H:i:s");

    checkId($val->donor_aid);

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Donor Update", $query);
}

checkEndpoint();
