<?php

use Singular\Command\Provider\CommandServiceProvider;

// registra o serviço dos comandos do framework
$app->register(new CommandServiceProvider());