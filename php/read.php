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


$redis = new Predis\Client();
$content = $redis->rpop(Constants::listname);
if (!$content) $content = 'empty';

header('Content-Type: text/plain');
$matches = array();
preg_match_all('/eleifend .*? felis/', $content, &$matches);
error_log(print_r($matches, true));
foreach($matches as $m)
  foreach($m as $v)
    echo "match:$v\n";
echo $content;
