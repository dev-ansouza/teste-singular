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
use Singular\Response\JsonResponse;

/**
 * Classe Componente
 *
 * @Controller
 *
 * @package Administracao\Controller;
 */
class Componente extends SingularController
{
    use Crud;

    /**
     * Defina o store padrão do controlador.
     *
     * @var $store
     */
    protected $store = 'componente';

    /**
     * Função responsável por salvar o registro de uma tabela do crud.
     *
     * @Route(method="post")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function save(Request $request)
    {
        $app = $this->app;

        /**
         * @var Cadastro\Store\Usuario
         */
        $store = $this->getStore();

        try {
            $data = $request->request->all();

            $componenteId = $app['sessao.service.componente']->saveComponente($data);

            $success = true;
        } catch (\Exception $e) {
            $success = false;
            $componenteId = -1;
        }

        return $app->json(array(
            'success' => $success,
            'record' => $componenteId
        ));

    }


    /**
     * Remove o registro de um componente passado como parametro.
     *
     * @Route(method="post")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function removeComponente(Request $request)
    {
        $app = $this->app;

        $data = $request->request->all();

        try {

            if ($data['tipo'] == 'M'){
                $subcomponentes = $app['sessao.store.componente']->findBy(array('parent' => $data['id']));

                if (count($subcomponentes) > 0) {
                    foreach ($subcomponentes as $subcomponente) {
                        $subcomponenteId = $app['sessao.store.componente']->remove($subcomponente['id']);
                    }
                }
            }

            $componenteId = $app['sessao.store.componente']->remove($data['id']);

            $success = true;
        } catch (\Exception $e){
            $success = false;
            $componenteId = -1;
        }


        return $app->json(array(
            'success' => $success,
            'record' => $componenteId
        ));
    }
}