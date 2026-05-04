<?php

class Children
{
    public $children_aid;
    public $children_is_active;
    public $children_full_name;
    public $children_birthday;
    public $children_story;
    public $children_donation_amount_limit;
    public $children_is_residence;
    public $children_created;
    public $children_updated;

    public $start;
    public $total;
    public $search;

    public $connection;
    public $lastInsertedId;

    public $tblChildren;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblChildren = "children_list";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblChildren} (";
            $sql .= " children_is_active, children_full_name, children_birthday, children_story,";
            $sql .= " children_donation_amount_limit, children_is_residence,";
            $sql .= " children_created, children_updated";
            $sql .= ") values (";
            $sql .= " :children_is_active, :children_full_name, :children_birthday, :children_story,";
            $sql .= " :children_donation_amount_limit, :children_is_residence,";
            $sql .= " :children_created, :children_updated";
            $sql .= ")";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "children_is_active" => $this->children_is_active,
                "children_full_name" => $this->children_full_name,
                "children_birthday" => $this->children_birthday,
                "children_story" => $this->children_story,
                "children_donation_amount_limit" => $this->children_donation_amount_limit,
                "children_is_residence" => $this->children_is_residence,
                "children_created" => $this->children_created,
                "children_updated" => $this->children_updated,
            ]);

            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            return json_encode([
                "count" => 0,
                "success" => false,
                "type" => "pdo_exception",
                "error" => $e->getMessage()
            ]);
        }
        return $query;
    }

    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblChildren} where true ";
            $sql .= $this->children_is_active != "" ? " and children_is_active = :children_is_active " : "";
            $sql .= $this->search != "" ? " and (children_full_name like :s1) " : "";

            $query = $this->connection->prepare($sql);

            $params = [];
            if ($this->children_is_active != "") {
                $params["children_is_active"] = $this->children_is_active;
            }
            if ($this->search != "") {
                $params["s1"] = "%{$this->search}%";
            }

            $query->execute($params);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select * from {$this->tblChildren} where true ";
            $sql .= $this->children_is_active != "" ? " and children_is_active = :children_is_active " : "";
            $sql .= $this->search != "" ? " and (children_full_name like :s1) " : "";
            $sql .= " limit :start, :total ";

            $query = $this->connection->prepare($sql);

            $params = [
                "start" => (int) ($this->start - 1),
                "total" => (int) $this->total,
            ];

            if ($this->children_is_active != "") {
                $params["children_is_active"] = $this->children_is_active;
            }
            if ($this->search != "") {
                $params["s1"] = "%{$this->search}%";
            }

            $query->execute($params);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblChildren} set ";
            $sql .= " children_is_active = :children_is_active, ";
            $sql .= " children_full_name = :children_full_name, ";
            $sql .= " children_birthday = :children_birthday, ";
            $sql .= " children_story = :children_story, ";
            $sql .= " children_donation_amount_limit = :children_donation_amount_limit, ";
            $sql .= " children_is_residence = :children_is_residence, ";
            $sql .= " children_updated = :children_updated ";
            $sql .= " where children_aid = :children_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "children_is_active" => $this->children_is_active,
                "children_full_name" => $this->children_full_name,
                "children_birthday" => $this->children_birthday,
                "children_story" => $this->children_story,
                "children_donation_amount_limit" => $this->children_donation_amount_limit,
                "children_is_residence" => $this->children_is_residence,
                "children_updated" => $this->children_updated,
                "children_aid" => $this->children_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblChildren} set ";
            $sql .= " children_is_active = :children_is_active, ";
            $sql .= " children_updated = :children_updated ";
            $sql .= " where children_aid = :children_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "children_is_active" => $this->children_is_active,
                "children_updated" => $this->children_updated,
                "children_aid" => $this->children_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblChildren} where children_aid = :children_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "children_aid" => $this->children_aid
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        $sql = "select children_full_name from {$this->tblChildren} ";
        $sql .= " where children_full_name = :name ";

        $query = $this->connection->prepare($sql);
        $query->execute([
            "name" => $this->children_full_name
        ]);

        return $query;
    }
}