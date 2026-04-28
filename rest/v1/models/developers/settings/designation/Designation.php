<?php

class Designation
{
    public $designation_aid;
    public $designation_is_active;
    public $designation_name;
    public $designation_category;
    public $designation_created;
    public $designation_updated;

    public $connection;
    public $lastInsertedId;

    public $tblSettingsDesignation;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsDesignation = "settings_designation";
    }

    // CREATE
    public function create()
    {
        try {
            $sql = "insert into {$this->tblSettingsDesignation} ";
            $sql .= " ( ";
            $sql .= " designation_is_active, ";
            $sql .= " designation_name, ";
            $sql .= " designation_category, ";
            $sql .= " designation_created, ";
            $sql .= " designation_updated ";
            $sql .= " ) values ( ";
            $sql .= " :designation_is_active, ";
            $sql .= " :designation_name, ";
            $sql .= " :designation_category, ";
            $sql .= " :designation_created, ";
            $sql .= " :designation_updated ";
            $sql .= " ) ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "designation_is_active" => $this->designation_is_active,
                "designation_name" => $this->designation_name,
                "designation_category" => $this->designation_category,
                "designation_created" => $this->designation_created,
                "designation_updated" => $this->designation_updated,
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
            $sql = "select * from {$this->tblSettingsDesignation}";
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
            $sql = "update {$this->tblSettingsDesignation} set ";
            $sql .= "designation_name = :designation_name, ";
            $sql .= "designation_category = :designation_category, ";
            $sql .= "designation_updated = :designation_updated ";
            $sql .= "where designation_aid = :designation_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "designation_name" => $this->designation_name,
                "designation_category" => $this->designation_category,
                "designation_updated" => $this->designation_updated,
                "designation_aid" => $this->designation_aid,
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
            $sql = "update {$this->tblSettingsDesignation} set ";
            $sql .= "designation_is_active = :designation_is_active, ";
            $sql .= "designation_updated = :designation_updated ";
            $sql .= "where designation_aid = :designation_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "designation_is_active" => $this->designation_is_active,
                "designation_updated" => $this->designation_updated,
                "designation_aid" => $this->designation_aid,
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
            $sql = "delete from {$this->tblSettingsDesignation} ";
            $sql .= "where designation_aid = :designation_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "designation_aid" => $this->designation_aid,
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
            $sql = "select designation_name from {$this->tblSettingsDesignation} ";
            $sql .= "where designation_name = :designation_name ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "designation_name" => $this->designation_name,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }
}