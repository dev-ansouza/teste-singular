<?php
namespace Sessao\Store;

use Singular\SingularStore;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Usuario
 *
 * @Service
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Usuario extends SingularStore
{
    /**
     * Definição da tabela vinculada ao store.
     *
     * @var string
     */
    protected $table = 'singular_usuario';

    /**
     * Perfis de consulta.
     * 
     * @var array
     */
    protected $profiles = [
        'default' => [
            'select' => [
                't.*',
                'p.perfil'
            ],
            'joins' => [
                ['singular_perfil','p','p.id = t.perfil_id']
            ],
            'filters' => [],
            'groupings' => []
        ]
    ];
}
