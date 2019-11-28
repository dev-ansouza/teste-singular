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
 * Classe Modulo.
 *
 * @Controller
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Modulo extends SingularController
{
    use Crud;

    /**
     * Defina o store padrão do controlador.
     *
     * @var $store
     */
    protected $store = 'modulo';

    /**
     * Altera a requisição antes de salvar o registro do módulo.
     *
     * @param Request $request
     */
    protected function beforeSave(Request $request)
    {
        $id = $request->request->get('id', uniqid());
        $request->request->set('id', $id);
    }

    /**
     * Acionado após salvar o módulo
     *
     * @param Request $request
     * @param array   $response
     *
     * @return array
     */
    protected function afterSave(Request $request, $response)
    {
        $app = $this->app;

        // cria o componente vinculado a este menu
        $app['sessao.service.componente']->createFromModulo($request->get('id'), $request->request->all());

        return $response;
    }

    /**
     * Função executada após remover o registro do módulo.
     *
     * @param Request $request
     * @param array   $response
     *
     * @return array
     */
    protected function afterRemove(Request $request, $response)
    {
        $app = $this->app;

        $app['sessao.store.componente']->removeByModulo($request->get('id'));

        return $response;
    }

}