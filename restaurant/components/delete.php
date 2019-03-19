<?php
/**
 * Created by PhpStorm.
 * User: volyinets
 * Date: 03.09.2018
 * Time: 19:07
 */
require_once 'functions.php';
if(empty($_GET["id"])) die("Erroe");
$img = getIdImage($_GET["id"]);
if(unlink($_SERVER["DOCUMENT_ROOT"].$img["url"])){
    deleteImage($_GET["id"]);
    header("Location:".$_SERVER["HTTP_REFERER"]);
}
