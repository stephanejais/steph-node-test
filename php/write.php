<?php 
require 'constants.php';
define("PREDIS_BASE_PATH", "");
spl_autoload_register(function($class) {
    $file = PREDIS_BASE_PATH . strtr($class, '\\', '/') . '.php';
    if (file_exists($file)) {
        require $file;
        return true;
    }
});


$content = file_get_contents('../content.txt');
$redis = new Predis\Client();
$redis->lpush(Constants::listname, $content);
echo $content;
