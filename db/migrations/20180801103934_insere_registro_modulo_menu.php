<?php

use Phinx\Migration\AbstractMigration;

class InsereRegistroModuloMenu extends AbstractMigration
{
    /**
     * Insere os registros no banco.
     */
    public function up()
    {
        $modulos = [
            [
                'id' => 4,
                'modulo' => 'Menus',
                'icon_cls' => 'fa fa-list-ul',
                'ui_sref' => 'app.menu',
                'aplicacao_id' => 1,
                'ordem' => 101,
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
        $this->execute('DELETE FROM singular_modulo WHERE id = 4');
    }
}
