<?php

use Phinx\Migration\AbstractMigration;

class InsereRegistrosComponentes1507124054 extends AbstractMigration
{
    /**
     * Insere os registros no banco.
     */
    public function up()
    {

        $comonentes = [
            ["id" => "59d4c7b408ccb","text" => "Usuários","chave" => "m-usuarios","tipo" => "M","icon" => "fa fa-group","parent" => "#","menu_id" => "2","migration" => "1507124054"]
            ,["id" => "59d4c7b412344","text" => "Listar","chave" => "f-usuarios-list","tipo" => "F","icon" => "fa fa-list","parent" => "59d4c7b408ccb","menu_id" => null,"migration" => "1507124054"]
            ,["id" => "59d4c7b413295","text" => "Criar","chave" => "f-usuarios-create","tipo" => "F","icon" => "fa fa-check","parent" => "59d4c7b408ccb","menu_id" => null,"migration" => "1507124054"]
            ,["id" => "59d4c7b4141bf","text" => "Editar","chave" => "f-usuarios-edit","tipo" => "F","icon" => "fa fa-edit","parent" => "59d4c7b408ccb","menu_id" => null,"migration" => "1507124054"]
            ,["id" => "59d4c7b415601","text" => "Remover","chave" => "f-usuarios-remove","tipo" => "F","icon" => "fa fa-trash","parent" => "59d4c7b408ccb","menu_id" => null,"migration" => "1507124054"]
            ,["id" => "59d4c7b4166af","text" => "Visualizar","chave" => "f-usuarios-show","tipo" => "F","icon" => "fa fa-eye","parent" => "59d4c7b408ccb","menu_id" => null,"migration" => "1507124054"]
        ];

        $this->insert('singular_componente', $comonentes);
    }

    /**
     * Excluí os registros do banco.
     */
    public function down()
    {
        $this->execute('DELETE FROM singular_componente WHERE migration = "1507124054"');
    }
}
