<?php
namespace Sessao\Store;

use Singular\SingularStore;
use Symfony\Component\HttpFoundation\Request;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Modulo
 *
 * @Service
 *
 * @package Sessao\Store;
 */
class Modulo extends SingularStore
{
    /**
     * Referência à tabela no banco de dados.
     *
     * @var string
     */
    protected $table = 'singular_modulo';

    /**
     * Definição dos perfis de consulta.
     *
     * @var array
     */
    protected $profiles = [
        'default' => [
            'select' => ['t.*','a.aplicacao'],
            'joins' => [
                ['singular_aplicacao','a','a.id = t.aplicacao_id']
            ]
        ]
    ];
    
    /**
     * Recupera os módulos que um usuário possui privilégio de acesso.
     *
     * @param int $perfilId
     * @param int $aplicacaoId
     *
     * @return array
     */
    public function getModulosByAplicacao($perfilId, $aplicacaoId)
    {
        $app = $this->app;

        $qb = $this->db->createQueryBuilder();

        $qb->select('t.*')
            ->from($this->table,'t')
            ->where('t.aplicacao_id = :aplicacao')
            ->andWhere('t.ativo = "1"')
            ->andWhere('t.modulo_id IS NULL')
            ->orderBy('t.ordem','ASC');

        $rs = $this->db->fetchAll($qb->getSQL(),['aplicacao' => $aplicacaoId]);
        $modulos = array();

        foreach ($rs as $modulo) {
            $acesso = $app['sessao.store.permissao']->hasAcessoModulo($perfilId, $modulo['id']);

            if ($acesso){
                $modulo['modulos'] = $this->getSubModulos($modulo['id']);

                $modulos[] = $modulo;
            }
        }

        return $modulos;
    }

    /**
     * Recupera a relação de submódulos de um determinado módulo.
     *
     * @param $moduloId
     *
     * @return array
     */
    private function getSubModulos($moduloId)
    {
        $qb = $this->db->createQueryBuilder();

        $qb->select('m.*')
            ->from($this->table,'m')
            ->where('m.modulo_id = :modulo')
            ->andWhere('m.ativo = "1"')
            ->orderBy('m.ordem','ASC');

        $rs = $this->db->fetchAll($qb->getSQL(), ['modulo' => $moduloId]);

        $modulos = array();

        foreach ($rs as $modulo) {
            $modulo['modulos'] = $this->getSubModulos($modulo['id']);
            $modulos[] = $modulo;
        }

        return $modulos;
    }
}