<?php
require_once 'functions.php';
$name = $_POST['name'];
$url = $_POST['url'];
if (empty($_POST["name"]) || empty($_POST["url"])) die ("error");
if (addNotes($name, $url)) {
    echo "Right";
} else {
    echo "Not right";
}
    
?>