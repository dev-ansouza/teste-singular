<?php
namespace Sessao\Controller;

use Singular\SingularController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Singular\Annotation\Controller;
use Singular\Annotation\Route;
use Singular\Annotation\Direct;
use Singular\Annotation\Value;
use Singular\Annotation\Assert;
use Singular\Annotation\Convert;
use Singular\Annotation\After;
use Singular\Annotation\Before;
use Symfony\Component\HttpFoundation\Response;

/**
 * Classe Main
 *
 * @Controller
 *
 * @package Sessao\Controller;
 */
class Main extends SingularController
{
    /**
     * Exibe a página principal de acesso autenticado do sistema.
     *
     * @Route(method="get", pattern="/secure.app", name="secure")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function showSecure(Request $request)
    {
        $app = $this->app;

        // se a sessão não estiver aberta, redireciona para a página de autenticação
        if (!$app['sessao.service.sessao']->isOpened()) {
            return $app->redirect($app['url_generator']->generate('auth'));
        }

        // recupera a sessão aberta para o usuário
        $sessao = $app['session']->get($app['session.name']);

        // recupera o menu liberado para o usuário autenticado
        $menu = $app['sessao.service.menu']->getMenu($sessao['perfil_id']);

        // recupera a string de permissao de usuário
        $acl = $app['sessao.service.permissao']->getStringAcl($sessao['perfil_id']);

        // renderiza a página de acesso protegido do sistema
        return $app['twig']->render("secure.html", array(
            'menu' => json_encode($menu),
            'session' => json_encode($sessao),
            'acl' => $acl
        ));
    }

    /**
     * Exibe a página principal de autenticação da aplicação.
     *
     * @Route(method="get", pattern="/auth.app", name="auth")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function showAuth(Request $request)
    {
        $app = $this->app;

        // se já existir uma sessão aberta para o usuário, redireciona para a página protegida
        if ($app['sessao.service.sessao']->isOpened()) {
            return $app->redirect($app['url_generator']->generate('secure'));
        }

        // rederiza a página de autenticação
        return $app['twig']->render("auth.html");
    }

    /**
     * Redireciona para a página de autenticação.
     *
     * @Route(method="get", pattern="/")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $app = $this->app;

        if (php_sapi_name() === 'cli') {
            return new Response();
        }

        // redireciona o acesso para a página de autenticação
        return $app->redirect($app["url_generator"]->generate("auth"));
    }
}
