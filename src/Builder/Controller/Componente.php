<?php
namespace Builder\Controller;

use Singular\Response\JsonResponse;
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
 * Classe Componente
 *
 * @Controller
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Componente extends SingularController
{
    use Crud;

    /**
     * Store do módulo de componentes.
     *
     * @var $store
     */
    protected $store = 'componente';

    /**
     * Cria uma migration para os componentes.
     *
     * @Route(method="post")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $app = $this->app;

        $app['singular.service.component']->create();

        return $app->json([
            'success' => true
        ]);
    }
}