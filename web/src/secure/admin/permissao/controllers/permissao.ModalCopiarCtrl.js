(function()
{
    'use strict';

    /**
     * Controlador responsável pela modal de cópia de permissões.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.permissao').controller(
        'permissao.ModalCopiarCtrl',
        [
            '$scope'
            ,'$uibModal'
            ,'$uibModalInstance'
            ,'SweetAlert'
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
     * @param $modalInstance
     * @param SweetAlert
     * @param toastr
     * @param $sngApi
     * @constructor
     */
    function Controller(
         $scope
        ,$uibModal
        ,$modalInstance
        ,SweetAlert
        ,toastr
        ,$sngApi
    ) {
        /**
         * Api de comunicação com o controlador de permissão.
         *
         * @type {$sngApi}
         */
        $scope.permissaoApi = $sngApi('sessao/permissao');

        /**
         * Api de comunicação com o controlador de perfil de acesso.
         *
         * @type {$sngApi}
         */
        $scope.perfilApi = $sngApi('sessao/perfil_acesso');

        /**
         * Objeto da cópia.
         *
         * @type {object}
         */
        $scope.copiar = {};

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function(){
            loadPerfil();
        };

        /**
         * Copia as permissões de um perfil para o outro.
         */
        $scope.copiaPermissoes = function () {

            var data = {
                origem_perfil_id: $scope.copiar.perfil_id,
                destino_perfil_id: $scope.perfil.id
            };

            // se o perfil de origem é diferente do perfil de destino
            if (data.origem_perfil_id !== data.destino_perfil_id) {

                // chama função remota para copiar o perfil
                $scope.permissaoApi.call('copiaPermissoesPerfil',data).then(function(response) {
                    toastr.clear();

                    if (response.success) {

                        $scope.close();
                        $scope.$parent.vm.alterado = false;
                        toastr.success('Permissões copiadas com sucesso!');
                    } else {
                        toastr.error('Falhou ao tentar copiar as permissões!');
                    }

                });
            } else {
                $scope.close();
            }
        };

        /*
         Fecha o modal em modo de cancelamento
         */
        $scope.cancel = function(){
            $modalInstance.dismiss();
        };

        $scope.close = function(){
            $modalInstance.close();
        };

        /**
         * Função de carregamento do perfil.
         */
        function loadPerfil() {
            $scope.perfilApi.find().then(function(results){
                $scope.listaPerfil = results;
            });
        }

        // chama função de inicialização do controlador
        $scope.onInit();
    }

}());