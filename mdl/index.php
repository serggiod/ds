<?php

session_start();

require 'vendor/autoload.php';

$e404 = function() {
	header("Status: 404 Not Found",true);
	header('HTTP/1.0 404 Not Found',true);
	header('Conection: close',true);
	die;
};

$app = new \Slim\App();
$pdo = new \PDO('mysql:host=localhost;dbname=ds;charset=utf8', 'test', 'test');

require 'models/esquemas.php';
require 'models/historico.php';
require 'models/session.php';
require 'models/usuarios.php';

unset($pdo);

$app->run();
