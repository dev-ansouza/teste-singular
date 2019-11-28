<?php

namespace Sessao\Store;

use Singular\SingularStore;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Permissao
 *
 * @Service
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Permissao extends SingularStore
{
    /**
     * Tabela relacionada no banco de dados.
     *
     * @var string
     */
    protected $table = 'singular_permissao';

    /**
     * Perfis de consulta.
     *
     * @var array
     */
    protected $profiles = [
        'default' => [
            'select' => ['t.*'],
            'joins' => [],
            'filters' => [],
            'groupings' => []
        ]
    ];

    /**
     * Verifica se uma função possui acesso há um módulo ou aos componentes deste módulo.
     *
     * @param integer $funcaoId
     * @param integer $moduloId
     *
     * @return boolean
     */
    public function hasAcessoModulo($funcaoId, $moduloId)
    {
        $app = $this->app;

        // localiza o componente associado ao módulo
        $componente = $app['sessao.store.componente']->findOneBy([
            'menu_id' => $moduloId
        ]);

        $ids = $app['sessao.store.componente']->getIdFilhosComponente($componente['id']);

        /** @var QueryBuilder $qb */
        $qb = $this->db->createQueryBuilder();

        $qb->select('t.*')
            ->from($this->table,'t')
            ->where('t.perfil_id = '.$funcaoId)
            ->andWhere('t.componente_id in ('.implode(',', $ids).')');

        $results = $this->db->fetchAll($qb->getSQL());

        return count($results) > 0 ? true : false;
    }
}