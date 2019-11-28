<?php

use Phinx\Migration\AbstractMigration;

class CriaTabelaSingularModulo extends AbstractMigration
{
    /**
     * Cria a tabela de módulos do menu.
     */
    public function change()
    {
        // define a tabela para trabalhar
        $modulo = $this->table(
            'singular_modulo',
            [
                'id' => false,
                'primary_key' => ['id'],
                'comment' => 'Armazena os registros dos módulos de uma aplicação no menu principal da aplicação'
            ]
        );

        // define as colunas da tabela
        $modulo
            ->addColumn(
                'id',
                'string',
                [
                    'limit' => 40
                ]
            )
            ->addColumn(
                'aplicacao_id',
                'string',
                [
                    'limit' => 40,
                    'comment' => 'Relacionamento com o registro associado na tabela [singular_aplicacao] 
                    através do campo [id]'
                ]
            )
            ->addColumn(
                'modulo_id',
                'string',
                [
                    'limit' => 40,
                    'null' => true,
                    'comment' => 'Relacionamento com o registro associado na tabela [singular_modulo] 
                    através do campo [id]. Refere-se ao módulo pai, quando aplicável'
                ]
            )
            ->addColumn(
                'modulo',
                'string',
                [
                    'limit' => 60,
                    'comment' => 'Nome do módulo, visível no menu'
                ]
            )
            ->addColumn(
                'icon_cls',
                'string',
                [
                    'limit' => 30,
                    'comment' => 'Classe css do ícone do módulo visível no menu'
                ]
            )
            ->addColumn(
                'ui_sref',
                'string',
                [
                    'limit' => 60,
                    'comment' => 'Nome do estado ui-router do módulo'
                ]
            )
            ->addColumn(
                'ordem',
                'integer',
                [
                    'comment' => 'Ordem de exibição do módulo no submenu da aplicação'
                ]
            )
            ->addColumn(
                'ativo',
                'integer',
                [
                    'limit' => \Phinx\Db\Adapter\MysqlAdapter::INT_TINY,
                    'comment' => 'Se o registro do módulo está ativo ou não. [1 = Ativo, 0 = Inativo]',
                    'default' => 1
                ]
            )
            ->addColumn(
                'migration',
                'string',
                [
                    'limit' => 25,
                    'comment' => 'Se o registro já possui uma entrada no mecanismo de migrations. [timestamp]',
                    'null' => true
                ]
            );

        // define as chaves estrangeiras da tabela
        $modulo
            ->addForeignKey(
                'aplicacao_id',
                'singular_aplicacao',
                'id',
                [
                    'delete' => 'CASCADE'
                ]
            )
            ->addForeignKey(
                'modulo_id',
                'singular_modulo',
                'id',
                [
                    'delete' => 'CASCADE'
                ]
            );

        // cria a tabela
        $modulo->create();
    }
}
