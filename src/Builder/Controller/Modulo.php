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
 * Classe Modulo
 *
 * @Controller
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Modulo extends SingularController
{
    /**
     * Retorna a lista dos módulos em um nível da hierarquia.
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
            'results' => $app['builder.service.modulo']->listModulos($path),
            'success' => true
        ]);

    }

    /**
     * Cria um novo módulo.
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

        $module = $request->get('name');
        $dir = str_replace('/',DIRECTORY_SEPARATOR,$request->get('dir'));
        $author = isset($app['author.name']) ? $app['author.name'] : 'Author';
        $email = isset($app['author.email']) ? $app['author.email'] : 'Email';

        try {
            $app['singular.service.module']->create($module, $dir, $author, $email);
            $created = true;
        } catch(\Exception $e) {
            $created = false;
        }

        return $app->json([
            'success' => $created
        ]);
    }


}