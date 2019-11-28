<?php

use Phinx\Migration\AbstractMigration;

class CriaTabelaSingularComponente extends AbstractMigration
{
    /**
     * Cria a tabela de componentes da aplicação.
     */
    public function change()
    {
        // define a tabela
        $componente = $this->table(
            'singular_componente',
            [
                'id' => false,
                'primary_key' => ['id'],
                'comment' => 'Armazena os registros dos componentes de interface que terão restrição de permissão'
            ]
        );

        // define os campos da tabela
        $componente
            ->addColumn(
                'id',
                'string',
                [
                    'limit' => 40
                ]
            )
            ->addColumn(
                'text',
                'string',
                [
                    'limit' => 60,
                    'comment' => 'Identificação textual do componente de interface'
                ]
            )
            ->addColumn(
                'chave',
                'string',
                [
                    'limit' => 100,
                    'comment' => 'Chave de associação única do componente para aplicação de permissão'
                ]
            )
            ->addColumn(
                'tipo',
                'string',
                [
                    'limit' => 1,
                    'comment' => 'Tipo de componente: [M = Módulo, C = Componente, F = Funcionalidade, W = Widget]'
                ]
            )
            ->addColumn(
                'icon',
                'string',
                [
                    'limit' => 30,
                    'comment' => 'Classe CSS do ícone utilizado na árvore de permissões da aplicação'
                ]
            )
            ->addColumn(
                'parent',
                'string',
                [
                    'limit' => 40,
                    'comment' => 'Chave de vínculo com o componente pai para a árvore de permissões',
                    'null' => true
                ]
            )
            ->addColumn(
                'menu_id',
                'string',
                [
                    'limit' => 40,
                    'comment' => 'Relacionamento com o registro associado na tabela [singular_modulo] 
                    através do campo [id]. Refere-se ao módulo de menu, caso o componente seja do tipo M',
                    'null' => true
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

        // cria a tabela
        $componente->create();
    }
}
