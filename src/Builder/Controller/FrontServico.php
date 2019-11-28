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
 * Classe FrontControlador
 *
 * @Controller
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class FrontServico extends SingularController
{
    /**
     * Retorna a lista dos serviços em um path.
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

        $path = $request->get('path','');

        return $app->json([
            'results' => $app['builder.service.front_servico']->listServicos($path),
            'success' => true
        ]);

    }

    /**
     * Cria um novo serviço.
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

        $controlador = $request->get('name');
        $modulo = $request->get('modulo');
        $dir = str_replace('/',DIRECTORY_SEPARATOR,$request->get('dir'));

        $tipo = $request->get('tipo');
        $author = isset($app['author.name']) ? $app['author.name'] : 'Author';
        $email = isset($app['author.email']) ? $app['author.email'] : 'Email';

        try {
            $app['singular.service.front_service']->create($controlador, $modulo, $dir, $tipo, $author, $email);
            $created = true;
        } catch(\Exception $e) {
            $created = false;
        }

        return $app->json([
            'success' => $created
        ]);
    }


}