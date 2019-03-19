<?php
/**
 * Created by PhpStorm.
 * User: volyinets
 * Date: 03.09.2018
 * Time: 19:07
 */
require_once 'functions.php';
if(empty($_POST["name"])) die("error");

$tmp_name = $_FILES["img"]["tmp_name"];
$tmp = explode("/", $_FILES["img"]["type"]);
$ext = end($tmp);
$url = "/files/".time().".".$ext;

if(move_uploaded_file($tmp_name, $_SERVER["DOCUMENT_ROOT"].$url)){
    addImage($_POST["name"], $url);
    header("Location:".$_SERVER["HTTP_REFERER"]);
} else {
    echo "Error";
}