(function()
{
    'use strict';

    /**
     * Controlador responsável pela lista de menus do builder.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.MenuListCtrl',
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
         * Api de comunicação com o controlador menu no backend.
         *
         * @type {$sngApi}
         */
        $scope.menuApi = $sngApi('builder/menu');

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function(){
            loadMenus();
        };

        /**
         * Chama o método remoto para criação da migration dos menus.
         */
        $scope.createMigration = function(){
            var msg = 'Deseja criar migration de menus para 1 menu?';

            if ($scope.menus.length > 1) {
                msg = 'Deseja criar migration de menus para ' + $scope.menus.length + ' menus?';
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
                        $scope.menuApi.call('create',{}).then(function(response){
                            if (response.success) {
                                toastr.success('Migrations criadas com sucesso');
                                loadMenus();
                            }
                        });
                    }
                });

        };

        /**
         * Carrega os menus da aplicação com pendência de migração
         */
        function loadMenus(){
            $scope.menuApi.find().then(function(results){
                $scope.menus = results;
            });
        }

        $scope.onInit();
    }

}());