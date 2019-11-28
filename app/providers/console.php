<?php

use Singular\Console\Provider\ConsoleServiceProvider;

$app->register(
    new ConsoleServiceProvider(),
    array(
        'console.name' => 'Singular Framework',
        'console.version' => '0.1.0',
        'console.project_directory' => __DIR__ . "/.."
    )
);