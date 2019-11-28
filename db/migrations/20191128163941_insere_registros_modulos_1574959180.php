<?php

use Phinx\Migration\AbstractMigration;

class InsereRegistrosModulos1574959180 extends AbstractMigration
{
    /**
     * Insere os registros no banco.
     */
    public function up()
    {

        $modulos = [
            ["id" => "5ddff8361532d","aplicacao_id" => "1","modulo_id" => null,"modulo" => "Agenda","icon_cls" => "fa fa-address-book","ui_sref" => "app.agenda-list","ordem" => "104","ativo" => "1","migration" => "1574959180"]
        ];

        $this->insert('singular_modulo', $modulos);
    }

    /**
     * Excluí os registros do banco.
     */
    public function down()
    {
        $this->execute('DELETE FROM singular_modulo WHERE migration = "1574959180"');
    }
}
