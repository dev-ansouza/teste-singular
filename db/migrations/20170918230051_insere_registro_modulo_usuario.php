<?php

use Phinx\Migration\AbstractMigration;

class InsereRegistroModuloUsuario extends AbstractMigration
{
    /**
     * Insere os registros no banco.
     */
    public function up()
    {
        $modulos = [
            [
                'id' => 2,
                'modulo' => 'Usuários',
                'icon_cls' => 'fa fa-users',
                'ui_sref' => 'app.usuario-list',
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
        $this->execute('DELETE FROM singular_modulo WHERE id = 2');
    }
}
