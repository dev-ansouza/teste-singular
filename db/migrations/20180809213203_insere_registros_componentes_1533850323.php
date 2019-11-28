<?php

use Phinx\Migration\AbstractMigration;

class InsereRegistrosComponentes1533850323 extends AbstractMigration
{
    /**
     * Insere os registros no banco.
     */
    public function up()
    {

        $comonentes = [
            ["id" => "5b6cb0a925cce","text" => "Builder","chave" => "m-builder","tipo" => "M","icon" => "fa fa-cubes","parent" => "#","menu_id" => "5b6731ad834ef","migration" => "1533850323"]
            ,["id" => "5b6cb0fd9b398","text" => "Criar pacote","chave" => "c-builder-pacote","tipo" => "C","icon" => "fa fa-folder-open","parent" => "5b6cb0a925cce","menu_id" => null,"migration" => "1533850323"]
            ,["id" => "5b6cb129b76f4","text" => "Criar controlador de backend","chave" => "c-builder-controlador_backend","tipo" => "C","icon" => "fa fa-cloud","parent" => "5b6cb0a925cce","menu_id" => null,"migration" => "1533850323"]
            ,["id" => "5b6cb14a1422c","text" => "Criar serviço de backend","chave" => "c-builder-servico_backend","tipo" => "C","icon" => "fa fa-cogs","parent" => "5b6cb0a925cce","menu_id" => null,"migration" => "1533850323"]
            ,["id" => "5b6cb16a4878c","text" => "Criar store","chave" => "c-builder-store","tipo" => "C","icon" => "fa fa-database","parent" => "5b6cb0a925cce","menu_id" => null,"migration" => "1533850323"]
            ,["id" => "5b6cb18b39f25","text" => "Criar módulo","chave" => "c-builder-modulo","tipo" => "C","icon" => "fa fa-cubes","parent" => "5b6cb0a925cce","menu_id" => null,"migration" => "1533850323"]
            ,["id" => "5b6cb1a5250f8","text" => "Criar controlador de frontend","chave" => "c-builder-controlador_frontend","tipo" => "C","icon" => "fa fa-bolt","parent" => "5b6cb0a925cce","menu_id" => null,"migration" => "1533850323"]
            ,["id" => "5b6cb1b84e0c0","text" => "Criar serviço de frontend","chave" => "c-builder-servico_frontend","tipo" => "C","icon" => "fa fa-cogs","parent" => "5b6cb0a925cce","menu_id" => null,"migration" => "1533850323"]
            ,["id" => "5b6cb1cf38d67","text" => "Criar views","chave" => "c-builder-view","tipo" => "C","icon" => "fa fa-window-maximize","parent" => "5b6cb0a925cce","menu_id" => null,"migration" => "1533850323"]
            ,["id" => "5b6cb27bd90f4","text" => "Criar migration de menus","chave" => "c-builder-migration_menu","tipo" => "C","icon" => "fa fa-bars","parent" => "5b6cb0a925cce","menu_id" => null,"migration" => "1533850323"]
            ,["id" => "5b6cb292942aa","text" => "Criar migration de componentes","chave" => "c-builder-migration_componente","tipo" => "C","icon" => "fa fa-puzzle-piece","parent" => "5b6cb0a925cce","menu_id" => null,"migration" => "1533850323"]
        ];

        $this->insert('singular_componente', $comonentes);
    }

    /**
     * Excluí os registros do banco.
     */
    public function down()
    {
        $this->execute('DELETE FROM singular_componente WHERE migration = "1533850323"');
    }
}
