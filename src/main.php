<?php
require_once dirname(__DIR__).'/vendor/autoload.php';

use LibWeb\Config;
use HirotoK\JSON5\JSON5;

$rootDir = dirname(__DIR__);
Config::feed( JSON5::decodeFile( $rootDir.'/config.example.json', true ) );
Config::feed( JSON5::decodeFile( $rootDir.'/config.json', true ) );
Config::feed( array(
	"root" => $rootDir,
));

