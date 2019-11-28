<?php
namespace Sessao\Service;

use Singular\SingularService;
use Symfony\Component\HttpFoundation\Request;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Permissao
 *
 * @Service
 *
 * @package Session\Service;
 */
class Permissao extends SingularService
{
    /**
     * Recupera a string de ACL de um perfil.
     *
     * @param integer $perfilId
     *
     * @return array
     */
    public function getStringAcl($perfilId)
    {
        $app = $this->app;

        $stringAcl = '';

        $componentes = $app['sessao.store.componente']
            ->setProfile('permissao')
            ->findBy([
                'p.perfil_id' => $perfilId
            ]);

        foreach ($componentes as $componente) {
            $stringAcl ='|'.$componente['chave'].'|'.$stringAcl;
        }

        return $stringAcl;
    }
}
