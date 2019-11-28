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
 * Classe Menu
 *
 * @Controller
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Menu extends SingularController
{
    /**
     * Encontra os menus com pendência de migration.
     *
     * @Route(method="post")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function find(Request $request)
    {
        $app = $this->app;

        return $app->json([
            'success' => true,
            'results' => $app['builder.store.menu']->listMenus()
        ]);
    }

    /**
     * Cria uma migration para os menus.
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

        $app['singular.service.menu']->create();

        return $app->json([
            'success' => true
        ]);
    }
}