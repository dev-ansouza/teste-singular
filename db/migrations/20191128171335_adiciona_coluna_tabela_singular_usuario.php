<?php

use Phinx\Migration\AbstractMigration;

class AdicionaColunaTabelaSingularUsuario extends AbstractMigration
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
        $usuario = $this->table(
            'singular_usuario',
            [
                'comment' => 'Armazena os registros dos usuários da aplicação'
            ]
        );

        $usuario
            ->addColumn(
                'conta_id',
                'integer',
                [
                    'null' => true,
                    'comment' => 'Relacionamento com o registro associado na tabela conta através do campo id'
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
        $usuario
            ->addForeignKey(
                'conta_id',
                'conta',
                'id',
                [
                    'delete' => 'RESTRICT'
                ]
            );

        //atualiza a estrutura da tabela
        $usuario->update();
    }
}
