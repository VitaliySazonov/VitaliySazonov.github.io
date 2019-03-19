<?php
/**
 * Created by PhpStorm.
 * User: volyinets
 * Date: 03.09.2018
 * Time: 19:07
 */
function Connection(){
    static $dbh = null;
    if($dbh !== null) return $dbh;
    $dbh = new PDO("mysql:host=localhost;dbname=gallery;charset=utf8", "root", "", [
        PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC
    ]);
    return $dbh;
}
function getAllImage(){
    $dbh = Connection();
    $stmt = $dbh -> query("Select * from `img`");
    return $stmt->fetchAll();
}
function addImage($name, $url){
    $dbh = Connection();
    $name = $dbh->quote($name);
    $url = $dbh->quote($url);
    $dbh->exec("insert into `img` (`name`, `url`) values ({$name}, {$url})");
}
function getIdImage($id){
    $dbh = Connection();
    $stmt = $dbh -> query("Select * from `img` where id = {$id}");
    return $stmt->fetch();
}
function deleteImage($id){
    $dbh = Connection();
    $id = (int)$id;
    $dbh->exec("delete from `img` where `id`={$id}");
}
function renameImage($id){
    $dbh = Connection();
    $stmt = $dbh -> quote($name);
    $dbh -> exec("insert into `img` (`name`) values ({$name})");
}