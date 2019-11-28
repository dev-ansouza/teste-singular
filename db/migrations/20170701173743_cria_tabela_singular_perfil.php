<?php

use Phinx\Migration\AbstractMigration;

class CriaTabelaSingularPerfil extends AbstractMigration
{
    /**
     * Cria tabela de perfil da aplicação.
     */
    public function change()
    {
        // define a tabela
        $perfil = $this->table(
            'singular_perfil',
            [
                'comment' => 'Armazena os registros de perfis de acesso à aplicação'
            ]
        );

        // adiciona as colunas
        $perfil
            ->addColumn(
                'perfil',
                'string',
                [
                    'limit' => 60,
                    'comment' => 'Nome do perfil de acesso'
                ]
            )
            ->addColumn(
                'ativo',
                'integer',
                [
                    'limit' => \Phinx\Db\Adapter\MysqlAdapter::INT_TINY,
                    'comment' => 'Se o perfil está ativo ou não. [1 = Ativo, 0 = Inativo]',
                    'default' => 1
                ]
            );

        // cria a tabela
        $perfil->create();
    }
}
