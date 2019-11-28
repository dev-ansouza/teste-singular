<?php

use Phinx\Migration\AbstractMigration;

class InsereRegistrosComponentes1507290140 extends AbstractMigration
{
    /**
     * Insere os registros no banco.
     */
    public function up()
    {

        $comonentes = [
            ["id" => "59d764c13dd8b","text" => "Permissões","chave" => "m-permissoes","tipo" => "M","icon" => "fa fa-lock","parent" => "#","menu_id" => "1","migration" => "1507290140"]
            ,["id" => "59d764d311f3e","text" => "Componentes","chave" => "m-componentes","tipo" => "M","icon" => "fa fa-puzzle-piece","parent" => "#","menu_id" => "3","migration" => "1507290140"]
            ,["id" => "59d76521205fe","text" => "Criar componentes","chave" => "f-componentes-create","tipo" => "F","icon" => "fa fa-plus-circle","parent" => "59d764d311f3e","menu_id" => null,"migration" => "1507290140"]
            ,["id" => "59d7654bdd522","text" => "Salvar componentes","chave" => "f-componentes-save","tipo" => "F","icon" => "fa fa-check-square-o","parent" => "59d764d311f3e","menu_id" => null,"migration" => "1507290140"]
            ,["id" => "59d7657a0f645","text" => "Excluir componentes","chave" => "f-componentes-remove","tipo" => "F","icon" => "fa fa-trash","parent" => "59d764d311f3e","menu_id" => null,"migration" => "1507290140"]
            ,["id" => "59d765d5d9df8","text" => "Criar perfil","chave" => "f-permissoes-perfil_create","tipo" => "F","icon" => "fa fa-plus-circle","parent" => "59d764c13dd8b","menu_id" => null,"migration" => "1507290140"]
            ,["id" => "59d765f20a7ef","text" => "Editar perfil","chave" => "f-permissoes-perfil_edit","tipo" => "F","icon" => "fa fa-edit","parent" => "59d764c13dd8b","menu_id" => null,"migration" => "1507290140"]
            ,["id" => "59d76610619e2","text" => "Excluir perfil","chave" => "f-permissoes-perfil_remove","tipo" => "F","icon" => "fa fa-trash","parent" => "59d764c13dd8b","menu_id" => null,"migration" => "1507290140"]
            ,["id" => "59d7666ceea6c","text" => "Alterar permissões","chave" => "f-permissoes-update","tipo" => "F","icon" => "fa fa-refresh","parent" => "59d764c13dd8b","menu_id" => null,"migration" => "1507290140"]
            ,["id" => "59d76a7f9a648","text" => "Copiar permissões","chave" => "f-permissoes-copy","tipo" => "F","icon" => "fa fa-copy","parent" => "59d764c13dd8b","menu_id" => null,"migration" => "1507290140"]
        ];

        $this->insert('singular_componente', $comonentes);
    }

    /**
     * Excluí os registros do banco.
     */
    public function down()
    {
        $this->execute('DELETE FROM singular_componente WHERE migration = "1507290140"');
    }
}
