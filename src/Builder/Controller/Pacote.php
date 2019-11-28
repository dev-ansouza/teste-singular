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
 * Classe Pacote
 *
 * @Controller
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Pacote extends SingularController
{
    /**
     * Localiza os pacotes criados e registrados na aplicação.
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
            'results' => $app['builder.service.pacote']->listPacotes(),
            'success' => true
        ]);
    }

    /**
     * Cria um novo pacote.
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

        $pack = $request->get('name');
        $author = isset($app['author.name']) ? $app['author.name'] : 'Author';
        $email = isset($app['author.email']) ? $app['author.email'] : 'Email';

        try {
            $app['singular.service.pack']->create($pack, $author, $email);
            $created = true;
        } catch(\Exception $e) {
            $created = false;
        }

        return $app->json([
            'success' => $created
        ]);
    }

    /**
     * Desabilita um pacote.
     *
     * @Route(method="post")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function enable(Request $request)
    {
        $app = $this->app;

        $pack = $request->get('name');

        $app['singular.service.pack']->enable($pack);

        return $app->json([
            'success' => true
        ]);
    }

    /**
     * Desabilita um pacote.
     *
     * @Route(method="post")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function disable(Request $request)
    {
        $app = $this->app;

        $pack = $request->get('name');

        $app['singular.service.pack']->disable($pack);

        return $app->json([
            'success' => true
        ]);
    }
}