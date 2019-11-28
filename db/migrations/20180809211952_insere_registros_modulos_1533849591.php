<?php

use Phinx\Migration\AbstractMigration;

class InsereRegistrosModulos1533849591 extends AbstractMigration
{
    /**
     * Insere os registros no banco.
     */
    public function up()
    {

        $modulos = [
            ["id" => "5b6731ad834ef","aplicacao_id" => "1","modulo_id" => null,"modulo" => "Builder","icon_cls" => "fa fa-cubes","ui_sref" => "app.builder","ordem" => "103","ativo" => "1","migration" => "1533849591"]
        ];

        $this->insert('singular_modulo', $modulos);
    }

    /**
     * Excluí os registros do banco.
     */
    public function down()
    {
        $this->execute('DELETE FROM singular_modulo WHERE migration = "1533849591"');
    }
}
