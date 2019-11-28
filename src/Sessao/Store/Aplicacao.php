<?php
namespace Sessao\Store;

use Illuminate\Database\Eloquent\Model;
use Sessao\Service\Sessao;
use Singular\SingularStore;
use Symfony\Component\HttpFoundation\Request;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Aplicacao
 *
 * @Service
 *
 * @package Sessao\Store;
 */
class Aplicacao extends SingularStore
{
    /**
     * Tabela relacionada no banco de dados.
     *
     * @var string
     */
    protected $table = 'singular_aplicacao';

    /**
     * Perfis de consulta.
     * 
     * @var array
     */
    protected $profiles = [
        'default' => [],
        'ativo' => [
            'filters' => ['t.ativo' => 1]
        ]
    ];
}