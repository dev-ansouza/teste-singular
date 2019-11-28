<?php

use Phinx\Migration\AbstractMigration;

class InsereRegistrosComponentes1574959260 extends AbstractMigration
{
    /**
     * Insere os registros no banco.
     */
    public function up()
    {

        $comonentes = [
            ["id" => "5ddff8365c68d","text" => "Agenda","chave" => "m-agenda","tipo" => "M","icon" => "fa fa-address-book","parent" => "#","menu_id" => "5ddff8361532d","migration" => "1574959260"]
            ,["id" => "5ddff83660edb","text" => "Listar","chave" => "f-agenda-list","tipo" => "F","icon" => "fa fa-list","parent" => "5ddff8365c68d","menu_id" => null,"migration" => "1574959260"]
            ,["id" => "5ddff8366339b","text" => "Criar","chave" => "f-agenda-create","tipo" => "F","icon" => "fa fa-check","parent" => "5ddff8365c68d","menu_id" => null,"migration" => "1574959260"]
            ,["id" => "5ddff836667fc","text" => "Editar","chave" => "f-agenda-edit","tipo" => "F","icon" => "fa fa-edit","parent" => "5ddff8365c68d","menu_id" => null,"migration" => "1574959260"]
            ,["id" => "5ddff836678c6","text" => "Remover","chave" => "f-agenda-remove","tipo" => "F","icon" => "fa fa-trash","parent" => "5ddff8365c68d","menu_id" => null,"migration" => "1574959260"]
            ,["id" => "5ddff83668b21","text" => "Visualizar","chave" => "f-agenda-show","tipo" => "F","icon" => "fa fa-eye","parent" => "5ddff8365c68d","menu_id" => null,"migration" => "1574959260"]
        ];

        $this->insert('singular_componente', $comonentes);
    }

    /**
     * Excluí os registros do banco.
     */
    public function down()
    {
        $this->execute('DELETE FROM singular_componente WHERE migration = "1574959260"');
    }
}
