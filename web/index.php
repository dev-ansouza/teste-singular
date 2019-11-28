<?php
require_once __DIR__.'/../vendor/autoload.php';

date_default_timezone_set ('America/Sao_Paulo');

error_reporting(E_ALL);
ini_set("display_errors", 1);

$app = new Singular\Application(array(
    "singular.directory.root" =>__DIR__.'/../',
    "singular.directory.app" =>__DIR__.'/../app/',
    "singular.directory.src" => __DIR__."/../src",
    "injector.directory.web" => __DIR__,
    "injector.directory.src" => __DIR__."/src",
    "injector.directory.deploy" => __DIR__."/deploy",
    "env"=>'prod',
    "debug" => true
));

$app->run();

return $app;