<?php

/**
 * @file
 * Router for the PHP Server.
 * @description
 * Copyright (c) 2014 Dave Olsen.
 * Licensed under the MIT license.
 */

use PatternLab\Config;

// Set-up the project base directory.
$baseDir = __DIR__ . "/../../";

// Auto-load classes.
if (file_exists($baseDir . "vendor/autoload.php")) {
  include $baseDir . "vendor/autoload.php";
}
else {
  print "it doesn't appear that pattern lab has been set-up yet...\n";
  print "please install pattern lab's dependencies by typing: php core/bin/composer.phar install...\n";
  exit;
}

// Load the options and be quiet about it.
Config::init($baseDir, FALSE);

if (($_SERVER["SCRIPT_NAME"] == "")||($_SERVER["SCRIPT_NAME"] == "/")) {
  include "index.html";
}
elseif (file_exists(Config::getOption("publicDir") . $_SERVER["SCRIPT_NAME"])) {
  return FALSE;
}
else {
  header("HTTP/1.0 404 Not Found");
  print "file doesn't exist.";
}
