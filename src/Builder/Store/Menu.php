<?php

namespace Builder\Store;

use Singular\SingularStore;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Menu
 *
 * @Service
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Menu extends SingularStore
{
    /**
     * Recupera a lista dos menus com pendência de migration.
     *
     * @return array
     */
    public function listMenus()
    {
        // consulta de aplicações com migrações pendentes
        $qbApp = $this->db->createQueryBuilder();
        $qbApp->select('a.aplicacao as menu')
            ->from('singular_aplicacao','a')
            ->where('a.migration IS NULL');

        $apps = $this->db->fetchAll($qbApp->getSQL());


        // consulta de módulos com migrações pendentes
        $qbMod = $this->db->createQueryBuilder();
        $qbMod->select('m.modulo as menu, a.aplicacao as grupo')
            ->from('singular_modulo','m')
            ->join('m','singular_aplicacao','a','a.id = m.aplicacao_id')
            ->where('m.migration IS NULL');

        $mods = $this->db->fetchAll($qbMod->getSQL());

        return array_merge($apps, $mods);
    }
}