<?php

use Phinx\Migration\AbstractMigration;

class InsereRegistrosIniciaisSingular extends AbstractMigration
{
    /**
     * Insere os registros no banco.
     */
    public function up()
    {
        $aplicacoes = [
            [
                'id' => 1,
                'aplicacao' => 'Administração',
                'ordem' => 100,
                'ativo' => 1,
                'migration' => time()
            ]
        ];

        $this->insert('singular_aplicacao', $aplicacoes);

        $modulos = [
            [
                'id' => 1,
                'modulo' => 'Permissões',
                'icon_cls' => 'fa fa-lock',
                'ui_sref' => 'app.permissao',
                'aplicacao_id' => 1,
                'ordem' => 100,
                'ativo' => 1,
                'migration' => time()
            ]
        ];
        
        $this->insert('singular_modulo', $modulos);
    }

    /**
     * Excluí os registros do banco.
     */
    public function down()
    {
        $this->execute('DELETE FROM singular_aplicacao');
    }
}
