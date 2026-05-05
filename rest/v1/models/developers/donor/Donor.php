<?php

class Donor
{
    public $donor_aid;
    public $donor_is_active;
    public $donor_first_name;
    public $donor_middle_name;
    public $donor_last_name;
    public $donor_email;
    public $donor_stripe;
    public $donor_contact;
    public $donor_address;
    public $donor_city;
    public $donor_state;
    public $donor_country;
    public $donor_zip;
    public $donor_key;
    public $donor_password;
    public $donor_created;
    public $donor_updated;

    public $start;
    public $total;
    public $search;

    public $connection;
    public $lastInsertedId;
    public $lastError;

    public $tblDonor;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblDonor = "donor_list";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblDonor} (";
            $sql .= " donor_is_active, donor_key, donor_password, donor_first_name, donor_middle_name, donor_last_name,";
            $sql .= " donor_email, donor_stripe, donor_contact, donor_address,";
            $sql .= " donor_city, donor_state, donor_country, donor_zip,";
            $sql .= " donor_created, donor_updated";
            $sql .= ") values (";
            $sql .= " :donor_is_active, :donor_key, :donor_password, :donor_first_name, :donor_middle_name, :donor_last_name,";
            $sql .= " :donor_email, :donor_stripe, :donor_contact, :donor_address,";
            $sql .= " :donor_city, :donor_state, :donor_country, :donor_zip,";
            $sql .= " :donor_created, :donor_updated";
            $sql .= ")";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "donor_is_active" => $this->donor_is_active,
                "donor_first_name" => $this->donor_first_name,
                "donor_middle_name" => $this->donor_middle_name,
                "donor_last_name" => $this->donor_last_name,
                "donor_email" => $this->donor_email,
                "donor_stripe" => $this->donor_stripe,
                "donor_contact" => $this->donor_contact,
                "donor_address" => $this->donor_address,
                "donor_city" => $this->donor_city,
                "donor_state" => $this->donor_state,
                "donor_country" => $this->donor_country,
                "donor_zip" => $this->donor_zip,
                "donor_key" => $this->donor_key,
                "donor_password" => $this->donor_password,
                "donor_created" => $this->donor_created,
                "donor_updated" => $this->donor_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            $this->lastError = $e->getMessage();
            $query = false;
        }
        return $query;
    }

    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblDonor} where true ";
            $sql .= $this->donor_is_active != "" ? " and donor_is_active = :donor_is_active " : "";
            $sql .= $this->search != "" ? " and (donor_first_name like :s1 or donor_last_name like :s2 or donor_email like :s3) " : "";
            $query = $this->connection->prepare($sql);
            $params = [];
            if ($this->donor_is_active != "") {
                $params["donor_is_active"] = $this->donor_is_active;
            }
            if ($this->search != "") {
                $params["s1"] = "%{$this->search}%";
                $params["s2"] = "%{$this->search}%";
                $params["s3"] = "%{$this->search}%";
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
            $sql = "select * from {$this->tblDonor} where true ";
            $sql .= $this->donor_is_active != "" ? " and donor_is_active = :donor_is_active " : "";
            $sql .= $this->search != "" ? " and (donor_first_name like :s1 or donor_last_name like :s2 or donor_email like :s3) " : "";
            $sql .= " limit :start, :total ";
            $query = $this->connection->prepare($sql);
            $params = [
                "start" => (int) ($this->start - 1),
                "total" => (int) $this->total,
            ];
            if ($this->donor_is_active != "") {
                $params["donor_is_active"] = $this->donor_is_active;
            }
            if ($this->search != "") {
                $params["s1"] = "%{$this->search}%";
                $params["s2"] = "%{$this->search}%";
                $params["s3"] = "%{$this->search}%";
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
            $sql = "update {$this->tblDonor} set ";
            $sql .= " donor_is_active = :donor_is_active, ";
            $sql .= " donor_key = :donor_key, ";
            $sql .= " donor_password = :donor_password, ";
            $sql .= " donor_first_name = :donor_first_name, ";
            $sql .= " donor_middle_name = :donor_middle_name, ";
            $sql .= " donor_last_name = :donor_last_name, ";
            $sql .= " donor_email = :donor_email, ";
            $sql .= " donor_stripe = :donor_stripe, ";
            $sql .= " donor_contact = :donor_contact, ";
            $sql .= " donor_address = :donor_address, ";
            $sql .= " donor_city = :donor_city, ";
            $sql .= " donor_state = :donor_state, ";
            $sql .= " donor_country = :donor_country, ";
            $sql .= " donor_zip = :donor_zip, ";
            $sql .= " donor_updated = :donor_updated ";
            $sql .= " where donor_aid = :donor_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "donor_is_active" => $this->donor_is_active,
                "donor_first_name" => $this->donor_first_name,
                "donor_middle_name" => $this->donor_middle_name,
                "donor_last_name" => $this->donor_last_name,
                "donor_email" => $this->donor_email,
                "donor_stripe" => $this->donor_stripe,
                "donor_contact" => $this->donor_contact,
                "donor_address" => $this->donor_address,
                "donor_city" => $this->donor_city,
                "donor_state" => $this->donor_state,
                "donor_country" => $this->donor_country,
                "donor_zip" => $this->donor_zip,
                "donor_key" => $this->donor_key,
                "donor_password" => $this->donor_password,
                "donor_updated" => $this->donor_updated,
                "donor_aid" => $this->donor_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function setPassword()
    {
        try {
            $sql = " update {$this->tblDonor} set ";
            $sql .= " donor_key = '', ";
            $sql .= " donor_password = :donor_password, ";
            $sql .= " donor_updated = :donor_updated ";
            $sql .= " where donor_key = :donor_key ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "donor_password" => $this->donor_password,
                "donor_updated" => $this->donor_updated,
                "donor_key" => $this->donor_key,
            ]);

        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    public function readKey()
    {
        try {
            $sql = " select * from {$this->tblDonor} ";
            $sql .= " where donor_key = :donor_key ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "donor_key" => $this->donor_key,
            ]);

        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblDonor} set ";
            $sql .= " donor_is_active = :donor_is_active, ";
            $sql .= " donor_updated = :donor_updated ";
            $sql .= " where donor_aid = :donor_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "donor_is_active" => $this->donor_is_active,
                "donor_updated" => $this->donor_updated,
                "donor_aid" => $this->donor_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblDonor} where donor_aid = :donor_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute(["donor_aid" => $this->donor_aid]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        $sql = "select donor_first_name from {$this->tblDonor} ";
        $sql .= " where donor_first_name = :fname ";
        $query = $this->connection->prepare($sql);
        $query->execute(["fname" => $this->donor_first_name]);
        return $query;
    }
}
