<?php

class Notification
{
    public $notification_aid;
    public $notification_is_active;
    public $notification_name;
    public $notification_email;
    public $notification_phone;
    public $notification_purpose;
    public $notification_created;
    public $notification_updated;

    public $connection;
    public $lastInsertedId;

    public $tblSettingsNotification;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsNotification = "settings_notification";
    }

    // CREATE
    public function create()
    {
        try {
            $sql = "insert into {$this->tblSettingsNotification} ";
            $sql .= " ( ";
            $sql .= " notification_is_active, ";
            $sql .= " notification_name, ";
            $sql .= " notification_email, ";
            $sql .= " notification_phone, ";
            $sql .= " notification_purpose, ";
            $sql .= " notification_created, ";
            $sql .= " notification_updated ";
            $sql .= " ) values ( ";
            $sql .= " :notification_is_active, ";
            $sql .= " :notification_name, ";
            $sql .= " :notification_email, ";
            $sql .= " :notification_phone, ";
            $sql .= " :notification_purpose, ";
            $sql .= " :notification_created, ";
            $sql .= " :notification_updated ";
            $sql .= " ) ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "notification_name" => $this->notification_name,
                "notification_email" => $this->notification_email,
                "notification_phone" => $this->notification_phone,
                "notification_purpose" => $this->notification_purpose,
                "notification_created" => $this->notification_created,
                "notification_updated" => $this->notification_updated,
            ]);

            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    // READ
    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblSettingsNotification}";
            $query = $this->connection->query($sql);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    // UPDATE
    public function update()
    {
        try {
            $sql = "update {$this->tblSettingsNotification} set ";
            $sql .= "notification_name = :notification_name, ";
            $sql .= "notification_email = :notification_email, ";
            $sql .= "notification_phone = :notification_phone, ";
            $sql .= "notification_purpose = :notification_purpose, ";
            $sql .= "notification_updated = :notification_updated ";
            $sql .= "where notification_aid = :notification_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_name" => $this->notification_name,
                "notification_email" => $this->notification_email,
                "notification_phone" => $this->notification_phone,
                "notification_purpose" => $this->notification_purpose,
                "notification_updated" => $this->notification_updated,
                "notification_aid" => $this->notification_aid,
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }

        return $query;
    }

    // ACTIVE / INACTIVE
    public function active()
    {
        try {
            $sql = "update {$this->tblSettingsNotification} set ";
            $sql .= "notification_is_active = :notification_is_active, ";
            $sql .= "notification_updated = :notification_updated ";
            $sql .= "where notification_aid = :notification_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "notification_updated" => $this->notification_updated,
                "notification_aid" => $this->notification_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    // DELETE
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblSettingsNotification} ";
            $sql .= "where notification_aid = :notification_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_aid" => $this->notification_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    // CHECK NAME
    public function checkName()
    {
        try {
            $sql = "select notification_name from {$this->tblSettingsNotification} ";
            $sql .= "where notification_name = :notification_name ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_name" => $this->notification_name,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }
}