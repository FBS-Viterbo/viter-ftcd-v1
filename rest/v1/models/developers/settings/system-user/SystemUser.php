<?php

class SystemUser
{
    public $system_aid;
    public $system_is_active;
    public $system_name;
    public $system_email;
    public $system_role;

    public $connection;
    public $lastInsertedId;

    public $tblSettingsSystem;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsSystem = "settings_system";
    }

    // CREATE
    public function create()
    {
        try {
            $sql = "INSERT INTO {$this->tblSettingsSystem} ";
            $sql .= "( ";
            $sql .= "system_is_active, ";
            $sql .= "system_name, ";
            $sql .= "system_email, ";
            $sql .= "system_role ";
            $sql .= ") VALUES ( ";
            $sql .= ":system_is_active, ";
            $sql .= ":system_name, ";
            $sql .= ":system_email, ";
            $sql .= ":system_role ";
            $sql .= ")";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_is_active" => $this->system_is_active,
                "system_name" => $this->system_name,
                "system_email" => $this->system_email,
                "system_role" => $this->system_role,
            ]);

            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    // READ ALL
    public function readAll()
    {
        try {
            $sql = "SELECT * FROM {$this->tblSettingsSystem}";
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
            $sql = "UPDATE {$this->tblSettingsSystem} SET ";
            $sql .= "system_name = :system_name, ";
            $sql .= "system_email = :system_email, ";
            $sql .= "system_role = :system_role ";
            $sql .= "WHERE system_aid = :system_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_name" => $this->system_name,
                "system_email" => $this->system_email,
                "system_role" => $this->system_role,
                "system_aid" => $this->system_aid,
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }

        return $query;
    }

    // ACTIVATE / DEACTIVATE
    public function active()
    {
        try {
            $sql = "UPDATE {$this->tblSettingsSystem} SET ";
            $sql .= "system_is_active = :system_is_active ";
            $sql .= "WHERE system_aid = :system_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_is_active" => $this->system_is_active,
                "system_aid" => $this->system_aid,
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
            $sql = "DELETE FROM {$this->tblSettingsSystem} ";
            $sql .= "WHERE system_aid = :system_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_aid" => $this->system_aid,
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
            $sql = "SELECT system_name FROM {$this->tblSettingsSystem} ";
            $sql .= "WHERE system_name = :system_name";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_name" => $this->system_name,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }
}