(function()
{
    'use strict';

    /**
     * Controlador responsável pela lista de componentes do builder.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.ComponenteListCtrl',
        [
            '$scope'
            ,'$state'
            ,'$stateParams'
            ,'$uibModal'
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
     * @param $state
     * @param $stateParams
     * @param $uibModal
     * @param SweetAlert
     * @param toastr
     * @param $sngApi
     * @constructor
     */
    function Controller(
         $scope
        ,$state
        ,$stateParams
        ,$uibModal
        ,SweetAlert
        ,toastr
        ,$sngApi
    ) {
        /**
         * Api de comunicação com o controlador componente no backend.
         *
         * @type {$sngApi}
         */
        $scope.componenteApi = $sngApi('builder/componente');

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function(){
            loadComponentes();
        };

        /**
         * Chama o método remoto para criação da migration dos componentes.
         */
        $scope.createMigration = function(){
            var msg = 'Deseja criar migration de componentes para 1 componente?';

            if ($scope.componentes.length > 1) {
                msg = 'Deseja criar migration de componentes para ' + $scope.componentes.length + ' componentes?';
            }

            SweetAlert.swal({
                    title: "Atenção",
                    text: msg,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Sim",
                    cancelButtonText: 'Não',
                    closeOnConfirm: true},
                function(confirm) {
                    if (confirm) {
                        $scope.componenteApi.call('create',{}).then(function(response){
                            if (response.success) {
                                toastr.success('Migrations criadas com sucesso');
                                loadComponentes();
                            }
                        });
                    }
                });

        };

        /**
         * Carrega os componentes da aplicação com pendência de migração
         */
        function loadComponentes(){
            $scope.componenteApi.find().then(function(results){
                $scope.componentes = results;
            });
        }

        $scope.onInit();
    }

}());