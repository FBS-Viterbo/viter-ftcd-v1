<?php

$conn = null;
$conn = checkDBConnection();

$val = new Roles($conn);

if (empty($_GET)) {
    $query = checkReadAll($val);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 if endpoint not found
checkEndpoint();

