<?php
namespace Sessao;


use Singular\Provider\PackServiceProvider;
use Silex\Application;
use Sessao\Controller\Main;
use Pimple\Container;

class SessaoServiceProvider extends PackServiceProvider
{
    protected $pack = 'sessao';

    public function register(Container $app)
    {
    }

    public function boot(Application $app)
    {
    }

    /**
     * Registra as rotas de inicialização da aplicação.
     *
     * @param Application $app
     */
    public function connect(Application $app)
    {
        // define o serviço do controlador principal
        $app['sessao.controller.main'] = function() use ($app) {
            return new Main($app, $app['singular.packs'][$this->pack]);
        };

        // define a rota de acesso autenticado da aplicação
        $app->get('/secure.app', 'sessao.controller.main:showSecure')->bind('secure');

        // define a rota de visualização da interface de registro e autenticação do sistema
        $app->get('/auth.app', 'sessao.controller.main:showAuth')->bind('auth');

        // define a rota default do sistema
        $app->get('/', 'sessao.controller.main:index');
    }
}
