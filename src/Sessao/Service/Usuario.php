<?php
namespace Sessao\Service;

use Singular\SingularService;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Usuario
 *
 * @Service
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Usuario extends SingularService
{
    /**
     * Efetua a validação da autenticação do usuário.
     *
     * @param string $login
     * @param string $pass
     *
     * @return array
     */
    public function authenticate($login, $pass)
    {
        $app = $this->app;
        
        $usuario = $app['sessao.store.usuario']->findOneBy([
            'login' => $login,
            'senha' => $pass
        ]);

        if ($usuario['ativo'] == 1) {
            return ['code' => 200, 'user' => $usuario];
        }

        return ['code' => 403];
    }

    public function teste(Request $request)
    {
        die('oi');
    }
}