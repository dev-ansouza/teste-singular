<?php

namespace Sessao\Store;

use Singular\SingularStore;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Agenda
 *
 * @Service
 *
 * @author Author <Email>
 */
class Agenda extends SingularStore
{
    /**
     * Tabela relacionada no banco de dados.
     *
     * @var string
     */
    protected $table = 'agenda';

    /**
     * Perfis de consulta.
     *
     * @var array
     */
    protected $profiles = [
        'default' => [
            'select' => ['t.*'],
            'joins' => [],
            'filters' => [],
            'groupings' => []
        ]
    ];
}