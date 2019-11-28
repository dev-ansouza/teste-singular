<?php

use Phinx\Migration\AbstractMigration;

class InsereRegistroModuloComponente extends AbstractMigration
{
    /**
     * Insere os registros no banco.
     */
    public function up()
    {
        $modulos = [
            [
                'id' => 3,
                'modulo' => 'Componentes',
                'icon_cls' => 'fa fa-puzzle-piece',
                'ui_sref' => 'app.componente',
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
        $this->execute('DELETE FROM singular_modulo WHERE id = 3');
    }
}
