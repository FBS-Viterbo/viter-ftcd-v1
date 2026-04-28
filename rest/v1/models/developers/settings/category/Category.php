<?php

class Category
{
    public $category_aid;
    public $category_is_active;
    public $category_name;
    public $category_description;
    public $category_created;
    public $category_updated;

    public $connection;
    public $lastInsertedId;

    public $tblCategory;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblCategory = "settings_category";
    }

    // CREATE
    public function create()
    {
        try {
            $sql = "INSERT INTO {$this->tblCategory} ";
            $sql .= "( ";
            $sql .= "category_is_active, ";
            $sql .= "category_name, ";
            $sql .= "category_description, ";
            $sql .= "category_created, ";
            $sql .= "category_updated ";
            $sql .= ") VALUES ( ";
            $sql .= ":category_is_active, ";
            $sql .= ":category_name, ";
            $sql .= ":category_description, ";
            $sql .= ":category_created, ";
            $sql .= ":category_updated ";
            $sql .= ")";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_is_active" => $this->category_is_active,
                "category_name" => $this->category_name,
                "category_description" => $this->category_description,
                "category_created" => $this->category_created,
                "category_updated" => $this->category_updated,
            ]);

            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            echo $e->getMessage(); // 👈 SHOW ACTUAL ERROR
            exit;
        }

        return $query;
    }

    // READ ALL
    public function readAll()
    {
        try {
            $sql = "SELECT * FROM {$this->tblCategory}";
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
            $sql = "UPDATE {$this->tblCategory} SET ";
            $sql .= "category_name = :category_name, ";
            $sql .= "category_description = :category_description, ";
            $sql .= "category_updated = :category_updated ";
            $sql .= "WHERE category_aid = :category_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_name" => $this->category_name,
                "category_description" => $this->category_description,
                "category_updated" => $this->category_updated,
                "category_aid" => $this->category_aid,
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
            $sql = "UPDATE {$this->tblCategory} SET ";
            $sql .= "category_is_active = :category_is_active ";
            $sql .= "WHERE category_aid = :category_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_is_active" => $this->category_is_active,
                "category_aid" => $this->category_aid,
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
            $sql = "DELETE FROM {$this->tblCategory} ";
            $sql .= "WHERE category_aid = :category_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_aid" => $this->category_aid,
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
            $sql = "SELECT category_name FROM {$this->tblCategory} ";
            $sql .= "WHERE category_name = :category_name";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_name" => $this->category_name,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }
}