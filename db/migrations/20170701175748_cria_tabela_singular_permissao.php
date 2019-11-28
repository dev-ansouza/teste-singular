<?php

use Phinx\Migration\AbstractMigration;

class CriaTabelaSingularPermissao extends AbstractMigration
{
    /**
     * Cria a tabela de permissões da aplicação.
     */
    public function change()
    {
        // define a tabela
        $permissao = $this->table(
            'singular_permissao',
            [
                'comment' => 'Armazena os registros das permissões de um perfil na aplicação'
            ]
        );

        // adiciona os campos da tabela
        $permissao
            ->addColumn(
                'componente_id',
                'string',
                [
                    'limit' => 40,
                    'comment' => 'Relacionamento com o registro associado na tabela [singular_componente] 
                    através do campo [id]. Refere-se ao componente para o qual está sendo definida a permissão'
                ]
            )
            ->addColumn(
                'perfil_id',
                'integer',
                [
                    'comment' => 'Relacionamento com o registro associado na tabela [singular_perfil] através do campo
                     [id]. Refere-se ao perfil para o qual está sendo definida a permissão'
                ]
            );

        // adiciona as chaves estrangeiras
        $permissao
            ->addForeignKey(
                'componente_id',
                'singular_componente',
                'id',
                [
                    'delete' => 'CASCADE',
                    'update' => 'NO_ACTION'
                ]
            )
            ->addForeignKey(
                'perfil_id',
                'singular_perfil',
                'id',
                [
                    'delete' => 'CASCADE',
                    'update' => 'NO_ACTION'
                ]
            );

        // cria a tabela
        $permissao->create();
    }
}
