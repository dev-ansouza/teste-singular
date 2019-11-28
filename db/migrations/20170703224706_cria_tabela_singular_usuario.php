<?php

use Phinx\Migration\AbstractMigration;

class CriaTabelaSingularUsuario extends AbstractMigration
{
    /**
     * Cria a tabela de usuários da aplicação.
     */
    public function change()
    {
        // definição da tabela
        $usuario = $this->table(
            'singular_usuario',
            [
                'comment' => 'Armazena os registros dos usuários da aplicação'
            ]
        );

        // adiciona os campos
        $usuario
            ->addColumn(
                'nome',
                'string',
                [
                    'limit' => 80,
                    'comment' => 'Nome para exibição do usuário'
                ]
            )
            ->addColumn(
                'login',
                'string',
                [
                    'limit' => 80,
                    'comment' => 'Login de acesso do usuário ao sistema'
                ]
            )
            ->addColumn(
                'avatar',
                'text',
                [
                    'limit' => \Phinx\Db\Adapter\MysqlAdapter::TEXT_LONG,
                    'comment' => 'Avatar do usuário',
                    'null' => true
                ]
            )
            ->addColumn(
                'senha',
                'string',
                [
                    'limit' => 100,
                    'comment' => 'Senha de acesso do usuário ao sistema'
                ]
            )
            ->addColumn(
                'ativo',
                'integer',
                [
                    'limit' => \Phinx\Db\Adapter\MysqlAdapter::INT_TINY,
                    'comment' => 'Se o usuário está ou não ativo. [1 = Ativo, 0 = Inativo]',
                    'default' => 1
                ]
            )
            ->addColumn(
                'perfil_id',
                'integer',
                [
                    'comment' => 'Relacionamento com o registro associado na tabela [singular_perfil] através
                     do campo [id]. Refere-se ao perfil de acesso do usuário no sistema.'
                ]
            );

        // adiciona as chaves estrangeiras
        $usuario
            ->addForeignKey(
                'perfil_id',
                'singular_perfil',
                'id',
                [
                    'delete' => 'RESTRICT'
                ]
            );

        // adiciona os índices
        $usuario
            ->addIndex(
                [
                    'login'
                ],
                [
                    'unique' => true,
                    'name' => 'idx_usuario_login'
                ]
            );

        // cria a tabela
        $usuario->create();
    }
}
