<?php

use Phinx\Migration\AbstractMigration;

class InsereRegistrosComponentes1533136097 extends AbstractMigration
{
    /**
     * Insere os registros no banco.
     */
    public function up()
    {

        $comonentes = [
            ["id" => "5b61c13199a14","text" => "Menus","chave" => "m-menus-list","tipo" => "M","icon" => "fa fa-list-ul","parent" => "#","menu_id" => "4","migration" => "1533136097"]
            ,["id" => "5b61c1aa3a878","text" => "Alterar menus","chave" => "f-menus-alterar","tipo" => "F","icon" => "fa fa-refresh","parent" => "5b61c13199a14","menu_id" => null,"migration" => "1533136097"]
            ,["id" => "5b61c1d0782b2","text" => "Criar aplicação","chave" => "f-menus-criar_aplicacao","tipo" => "F","icon" => "fa fa-plus-circle","parent" => "5b61c13199a14","menu_id" => null,"migration" => "1533136097"]
            ,["id" => "5b61c1f00bdb3","text" => "Editar aplicação","chave" => "f-menus-editar_aplicacao","tipo" => "F","icon" => "fa fa-edit","parent" => "5b61c13199a14","menu_id" => null,"migration" => "1533136097"]
            ,["id" => "5b61c22f90736","text" => "Excluir aplicação","chave" => "f-menus-excluir_aplicacao","tipo" => "F","icon" => "fa fa-trash","parent" => "5b61c13199a14","menu_id" => null,"migration" => "1533136097"]
            ,["id" => "5b61c29c9db60","text" => "Criar módulo","chave" => "f-menus-criar_modulo","tipo" => "F","icon" => "fa fa-plus-circle","parent" => "5b61c13199a14","menu_id" => null,"migration" => "1533136097"]
            ,["id" => "5b61c2d4db47a","text" => "Editar módulo","chave" => "f-menus-editar_modulo","tipo" => "F","icon" => "fa fa-edit","parent" => "5b61c13199a14","menu_id" => null,"migration" => "1533136097"]
            ,["id" => "5b61c2f633d41","text" => "Excluir módulo","chave" => "f-menus-excluir_modulo","tipo" => "F","icon" => "fa fa-trash","parent" => "5b61c13199a14","menu_id" => null,"migration" => "1533136097"]
        ];

        $this->insert('singular_componente', $comonentes);
    }

    /**
     * Excluí os registros do banco.
     */
    public function down()
    {
        $this->execute('DELETE FROM singular_componente WHERE migration = "1533136097"');
    }
}
