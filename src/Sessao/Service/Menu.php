<?php
namespace Sessao\Service;

use Singular\SingularService;
use Symfony\Component\HttpFoundation\Request;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Menu
 *
 * @Service
 *
 * @package Sessao\Service;
 */
class Menu extends SingularService
{
    /**
     * Recupera a relação de menus associada a um determinado usuário.
     *
     * @param integer $perfilId
     *
     * @return array
     */
    public function getMenu($perfilId)
    {
        $app = $this->app;

        $menu = array();

        $aplicacoes = $app['sessao.store.aplicacao']->setProfile('ativo')->findAll([],['t.ordem' => 'ASC']);

        foreach ($aplicacoes as $aplicacao) {
            $aplicacao['modules'] = $app['sessao.store.modulo']->getModulosByAplicacao($perfilId, $aplicacao['id']);

            if (count($aplicacao['modules']) > 0) {
                $menu[] = $aplicacao;
            }
        }

        return $menu;
    }
}