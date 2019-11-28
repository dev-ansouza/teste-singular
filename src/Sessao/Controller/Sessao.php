<?php
namespace Sessao\Controller;

use Singular\SingularController;
use Symfony\Component\HttpFoundation\Request;
use Singular\Annotation\Controller;
use Singular\Annotation\Route;
use Singular\Annotation\Direct;
use Singular\Annotation\Value;
use Singular\Annotation\Assert;
use Singular\Annotation\Convert;
use Singular\Annotation\After;
use Singular\Annotation\Before;

/**
 * Classe Sessao
 *
 * @Controller
 *
 * @package Sessao\Controller;
 */
class Sessao extends SingularController
{
    /**
     * Controlador que realiza a autenticação do usuário.
     *
     * @Route(method="post")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $app = $this->app;

        $autorizacao = $app['sessao.service.usuario']->authenticate(
            $request->get('login'),
            $request->get('senha')
        );

        if ($autorizacao['code'] == 200) {
            $app['sessao.service.sessao']->open($autorizacao['user']);
        }

        return $app->json(array(
            'code' => $autorizacao['code']
        ));
    }

    /**
     * Controlador responsável por efetuar o logout do usuário.
     *
     * @Route(method="post")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function logout(Request $request)
    {
        $app = $this->app;

        $app['sessao.service.sessao']->close();

        return $app->json(array(
            'success' => true
        ));
    }
}