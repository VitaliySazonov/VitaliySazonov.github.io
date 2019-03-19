<?php
function Connection(){
    static $dbh = null;
    if($dbh !== null) return $dbh;
    $dbh = new PDO("mysql:host=localhost;dbname=market;charset=utf8", "root", "", [
        PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC
    ]);
    return $dbh;
}
function getAllNotes(){
    $dbh = Connection();
    $stmt = $dbh -> query("Select * from `name`");
    return $stmt->fetchAll();
}
function addNotes($name, $url){
    $dbh = Connection();
    $name = $dbh->quote($name);
    $url = $dbh->quote($url);
    $dbh->exec("insert into `notes` (`name`, `url`) values ({$name}, {$url})");
}
function getIdNotes($id){
    $dbh = Connection();
    $stmt = $dbh -> query("Select * from `notes` where id = {$id}");
    return $stmt->fetch();
}
function deleteNotes($id){
    $dbh = Connection();
    $id = (int)$id;
    $dbh->exec("delete from `notes` where `id`={$id}");
}
function renameImage($id){
    $dbh = Connection();
    $stmt = $dbh -> quote($name);
    $dbh -> exec("insert into `notes` (`name`) values ({$name})");
}