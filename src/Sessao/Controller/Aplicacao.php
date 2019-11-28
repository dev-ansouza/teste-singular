<?php
namespace Sessao\Controller;

use Symfony\Component\HttpFoundation\Request;
use Singular\SingularController;
use Singular\Crud;
use Singular\Annotation\Controller;
use Singular\Annotation\Route;
use Singular\Annotation\Direct;
use Singular\Annotation\Value;
use Singular\Annotation\Assert;
use Singular\Annotation\Convert;
use Singular\Annotation\After;
use Singular\Annotation\Before;

/**
 * Classe Aplicacao
 *
 * @Controller
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Aplicacao extends SingularController
{
    use Crud;

    /**
     * Defina o store padrão do controlador.
     *
     * @var $store
     */
    protected $store = 'aplicacao';

    /**
     * Adiciona o ID da aplicação antes de salvar o registro no banco, caso ele não exista.
     *
     * @param Request $request
     */
    public function beforeSave(Request $request)
    {
        $id = $request->request->get('id', uniqid());
        $request->request->set('id', $id);
    }
}