<?php

session_start();

require 'vendor/autoload.php';

$e404 = function() {
	header("Status: 404 Not Found",true);
	header('HTTP/1.0 404 Not Found',true);
	header('Conection: close',true);
	die;
};

$session = function(){
	
	if($_SESSION['ESTADO']==='ACTIVO'){
		$date = new DateTime();
		$diff = ($date->getTimestamp() - intval($_SESSION['LASTTIME'])) /1000;
		if($diff<=3600) return true;
		else return false;
	} else return false;

};

$admin = function(){
	
	if($_SESSION['ADMIN']==='TRUE')return true;
	else return false;

};

$app = new \Slim\App();
$pdo = new \PDO('mysql:host=localhost;dbname=ds;charset=utf8', 'test', 'test');

require 'models/esquemas.php';
require 'models/historico.php';
require 'models/session.php';
require 'models/usuarios.php';

unset($pdo);

$app->run();
