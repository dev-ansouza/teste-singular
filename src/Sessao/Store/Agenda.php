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
 * @author Arthur Nunes <arthurn98@gmail.com>
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
     * Se o store irá utilizar o mecanismo de soft delete para a tabela.
     *
     * @var bool
     */
    protected $softDelete = true;

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