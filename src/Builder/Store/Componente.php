<?php

namespace Builder\Store;

use Singular\SingularStore;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Componente
 *
 * @Service
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Componente extends SingularStore
{
    /**
     * Tabela relacionada no banco de dados.
     *
     * @var string
     */
    protected $table = 'singular_componente';

    /**
     * Perfis de consulta.
     *
     * @var array
     */
    protected $profiles = [
        'default' => [
            'select' => ['t.*','g.text as grupo'],
            'joins' => [
                ['singular_componente','g','g.id = t.parent','left']
            ],
            'filters' => [
                't.migration' => 'isnull'
            ],
            'groupings' => []
        ]
    ];
}