<?php

use Phinx\Migration\AbstractMigration;

class InsereRegistroPerfilUsuario extends AbstractMigration
{
    /**
     * Insere os registros no banco.
     */
    public function up()
    {
        $perfis = [
            [
                'id' => 1,
                'perfil' => 'Genérico',
                'ativo' => 1
            ]
        ];

        $this->insert('singular_perfil', $perfis);

        $usuarios = [
            [
                'id' => 1,
                'nome' => 'Singular Framework',
                'login' => 'singular',
                'senha' => 'singular',
                'perfil_id' => 1
            ]
        ];

        $this->insert('singular_usuario', $usuarios);
    }

    /**
     * Excluí os registros do banco.
     */
    public function down()
    {
        $this->execute('DELETE FROM singular_usuario');
        $this->execute('DELETE FROM singular_perfil');
    }
}
