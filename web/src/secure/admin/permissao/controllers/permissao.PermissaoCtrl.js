(function()
{
    'use strict';

    /**
     * Controlador responsável pela tela de definição de permissões do sistema.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.permissao').controller(
        'permissao.PermissaoCtrl',
        [
             '$scope'
            ,'$uibModal'
            ,'toastr'
            ,'$sngApi'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $uibModal
     * @param toastr
     * @param $sngApi
     * @constructor
     */
    function Controller(
         $scope
        ,$uibModal
        ,toastr
        ,$sngApi
    ) {
        /**
         * Api de comunicação com o controlador de perfil de acesso.
         *
         * @type {$sngApi}
         */
        $scope.perfilApi = $sngApi('sessao/perfil_acesso');

        /**
         * Api de comunicação com o controlador de permissão.
         *
         * @type {$sngApi}
         */
        $scope.permissaoApi = $sngApi('sessao/permissao');

        /**
         * Definição das configurações da árvore de permissões.
         *
         * @type {Object}
         */
        $scope.vm = {
            ignoreChanges: false,
            newNode: {},
            treeVersion: 1,
            alterado: false
        };

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function() {
            reloadPerfis();
        };

        /**
         * Função que possibilita recarregar a lista de permissões.
         */
        $scope.reload = function() {
            $scope.permissaoApi.call('listarPermissoes', $scope.perfil).then(function(response){
                $scope.permissoes = response.results;
                reloadTree();
            });
        };

        /**
         * Função que seleciona o grupo de acesso apara ser caregada as permissões...
         */
        $scope.onSelectPerfil = function(perfil) {

            $scope.showBtnCopiar = true;

            $scope.perfil = perfil;
            $scope.nomePerfil = perfil.perfil;
            $scope.showPanel = true;
            $scope.reload();
        };


        /**
         * Abre a modal de copiar permissão.
         */
        $scope.abreModalCopiar = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/permissao/views/copiar.modal.html',
                controller: 'permissao.ModalCopiarCtrl',
                size: 'md',
                scope: $scope
            });

            modal.result.then(function (rec) {
                $scope.reload();
            });

        };

        /**
         * Abre a modal de criação do perfil.
         */
        $scope.abreModalPerfil = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/permissao/views/perfil.modal.html',
                controller: 'permissao.ModalCreateCtrl',
                size: 'md',
                scope: $scope

            });

            modal.result.then(function (rec) {
                reloadPerfis();
            });

        };

        /**
         * Abre a modal de editar o perfil.
         */
        $scope.editarPerfil = function () {

            var modal = $uibModal.open({
                templateUrl: 'src/secure/admin/permissao/views/perfil.modal.html',
                controller: 'permissao.ModalEditCtrl',
                size: 'md',
                scope: $scope,
                resolve: {
                    record: function(){
                        return angular.copy($scope.perfil);
                    }
                }
            });

            modal.result.then(function (rec) {
                $scope.perfil = rec;
                $scope.nomePerfil = rec.perfil;
                reloadPerfis();
            });

        };

        /**
         * Remove o perfil selecionado.
         */
        $scope.removerPerfil = function() {
            $scope.perfilApi.remove($scope.perfil.id, function(response){
                reloadPerfis();
                $scope.perfil = null;
            }, 'Atenção','Deseja realmente excluir este perfil?');
        };

        /**
         * Chama função para salvar as alterações na permissão.
         */
        $scope.savePermissoes = function () {

            $scope.permissaoApi.save($scope.perfil).then(function(response) {

                toastr.clear();

                if (response.success) {
                    $scope.vm.alterado = false;
                    toastr.success('Permissões definidas com sucesso!');
                    return ;
                }

                toastr.error('Falhou ao tentar definir permissões!');
            });

        };

        /**
         * Acionado ao selecionar um nó na árvore.
         *
         * @param node
         * @param selected
         */
        $scope.vm.selectNode = function(node,selected) {

            // define que a árvore de seleção foi alterada
            $scope.vm.alterado = true;

            // registra os nós selecionados
            $scope.perfil.selecteds = $scope.vm.treeInstance.jstree(true).get_selected();

            // registra o pai do nó selecionado
            $scope.perfil.selecteds.push(selected.node.parent);
        };

        /**
         * Acionado ao deselecionar um nó na árvore.
         *
         * @param node
         * @param selected
         */
        $scope.vm.deselectNode = function(node,selected) {

            // define que a árvore de seleção foi alterada
            $scope.vm.alterado = true;

            // registra os nós selecionados
            $scope.perfil.selecteds = $scope.vm.treeInstance.jstree(true).get_selected();

            // registra o pai do nó deselecionado
            $scope.perfil.selecteds.push(selected.node.parent);
        };


        /**
         * Função que recarrega a lista de perfis.
         */
        function reloadPerfis() {
            $scope.perfilApi.find().then(function(results) {
                $scope.listaPerfil = results;
            });
        }

        /**
         * Atualiza a lista de permissões da árvore.
         */
        function reloadTree() {

            if ($scope.permissoes.length > 0 ) {
                $scope.vm.originalData = $scope.permissoes;
            } else {
                $scope.vm.originalData =[];
            }

            $scope.vm.treeData = [];
            angular.copy($scope.vm.originalData,$scope.vm.treeData);

            $scope.vm.treeConfig = {
                core : {
                    multiple : true,
                    animation: true,
                    error : function(error) {
                        $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                    },
                    check_callback : true,
                    worker : true
                },
                version : $scope.vm.treeVersion++,
                plugins : ['type','checkbox','changed','json_data','ui']
            };

        }

        $scope.onInit();
    }

}());