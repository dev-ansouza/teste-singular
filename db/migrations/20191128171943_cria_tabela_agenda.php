<?php

use Phinx\Migration\AbstractMigration;

class CriaTabelaAgenda extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {

        //Definição da tabela
        $agenda = $this->table(
            'agenda',
            [
                'comment' => 'Armazena os registros da agenda'
            ]
        );

        //Adiciona os campos
        $agenda
            ->addColumn(
                'conta_id',
                'integer',
                [
                    'null' => true,
                    'comment' => 'Relacionamento com o registro associado na tabela conta através do campo id'
                ]
            )
            ->addColumn(
                'nome',
                'string',
                [
                    'limit' => 250,
                    'comment' => 'Nome do cliente'
                ]
            )
            ->addColumn(
                'email',
                'string',
                [
                    'limit' => 250,
                    'comment' => 'E-mail do cliente'
                ]
            )
            ->addColumn(
                'telefone',
                'string',
                [
                    'null' => true,
                    'limit' => '15',
                    'comment' => 'Referência ao telefone da filial'
                ]
            )
            ->addColumn(
                'dt_criacao',
                'datetime',
                [
                    'comment' => 'Data e hora de criação do registro',
                    'null' => true
                ]
            )
            ->addColumn(
                'dt_atualizacao',
                'datetime',
                [
                    'comment' => 'Data e hora de atualização do registro',
                    'null' => true
                ]
            ) ->addColumn(
                'dt_exclusao',
                'datetime',
                [
                    'comment' => 'Data e hora de exclusão do registro',
                    'null' => true
                ]
            );

        //Adiciona chave estrangeira
        $agenda
            ->addForeignKey(
                'conta_id',
                'conta',
                'id',
                [
                    'delete' => 'RESTRICT'
                ]
            );

        //Cria a tabela
        $agenda->create();

    }
}
