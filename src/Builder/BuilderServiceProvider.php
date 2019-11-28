<?php
namespace Builder;

use Singular\Provider\PackServiceProvider;
use Pimple\Container;
use Silex\Application;

/**
 * Provedor de serviços do pacote Builder.
 *
 * @author Author <author@email.com>
 */
class BuilderServiceProvider extends PackServiceProvider
{
    /**
     * Nome do pacote.
     *
     * @var string
     */
    protected $pack = 'builder';

    /**
     * Registra serviços e parâmetros do pacote.
     *
     * @param Container $app
     */
    public function register(Container $app)
    {
    }

    /**
     * Define controladores como serviços e mapeia rotas do pacote.
     *
     * @param Application $app
     */
    public function connect(Application $app)
    {
    }

    /**
     * Executa ações durante o boot da aplicação.
     *
     * @param Application $app
     */
    public function boot(Application $app)
    {
    }
}
