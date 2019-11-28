<?php
namespace Builder\Controller;

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
 * Classe BackControlador
 *
 * @Controller
 *
 * @author Author <author@email.com>
 */
class BackControlador extends SingularController
{
    /**
     * Localiza os controladores criados e registrados na aplicação.
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
            'results' => $app['builder.service.back_controlador']->listControladores(),
            'success' => true
        ]);
    }

    /**
     * Cria um novo controlador.
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

        $pack = $request->get('pacote');
        $controlador = $request->get('controlador');
        $author = isset($app['author.name']) ? $app['author.name'] : 'Author';
        $email = isset($app['author.email']) ? $app['author.email'] : 'Email';

        try {
            $app['singular.service.controller']->create($controlador, $pack, $author, $email, false);
            $created = true;
        } catch(\Exception $e) {
            $created = false;
        }

        return $app->json([
            'success' => $created
        ]);
    }


}