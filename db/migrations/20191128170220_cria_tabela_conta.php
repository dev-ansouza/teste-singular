<?php

use Phinx\Migration\AbstractMigration;

class CriaTabelaConta extends AbstractMigration
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
        $conta = $this->table(
            'conta',
            [
                'comment' => 'Armazena os registros das contas da aplicação'
            ]
        );

        //Adiciona os campos
        $conta
            ->addColumn(
                'tipo',
                'string',
                [
                    'limit' => 2,
                    'comment' => 'C = Cliente, E = Empresa'
                ]
            )
            ->addColumn(
                'avatar',
                'text',
                [
                    'limit' => \Phinx\Db\Adapter\MysqlAdapter::TEXT_LONG,
                    'comment' => 'Avatar do conta(logomarca)',
                    'null' => true
                ]
            )
            ->addColumn(
                'conta',
                'string',
                [
                    'limit' => 250,
                    'comment' => 'Nome da conta'
                ]
            )
            ->addColumn(
                'ativo',
                'integer',
                [
                    'limit' => \Phinx\Db\Adapter\MysqlAdapter::INT_TINY,
                    'comment' => 'Se o registro da conta está ativo ou não 1 = Ativo, 0 = Inativo',
                    'default' => 1
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

        //Cria a tabela
        $conta->create();

    }
}
