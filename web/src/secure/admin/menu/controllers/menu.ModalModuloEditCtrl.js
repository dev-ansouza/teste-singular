(function()
{
    'use strict';

    /**
     * Controlador responsável pela modal criação de uma nova aplicação.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.menu').controller(
        'menu.ModalModuloEditCtrl',
        [
             '$scope'
            ,'$uibModalInstance'
            ,'toastr'
            ,'$sngApi'
            ,'record'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $uibModalInstance
     * @param toastr
     * @param $sngApi
     * @param record
     * @constructor
     */
    function Controller(
         $scope
        ,$uibModalInstance
        ,toastr
        ,$sngApi
        ,record
    ) {

        /**
         * Api de comunicação com o controlador de módulo de acesso no backend.
         *
         * @type {$sngApi}
         */
        $scope.moduloApi = $sngApi('sessao/modulo');

        /**
         * Objeto do módulo.
         *
         * @type {object}
         */
        $scope.modulo = record;

        /**
         * Define o status do modal de criação de módulo.
         *
         * @type {string}
         */
        $scope.viewState = 'edit';

        /**
         * Salva o registro do novo módulo.
         */
        $scope.save = function() {
            // marca que o formulário já foi submetido
            $scope.isSubmited = true;

            if (!$scope.forms.modulo.$invalid) {
                $scope.isSaving = true;
                $scope.moduloApi.save($scope.modulo).then(function(response){
                    $scope.isSaving = false;

                    if (!response.success) {
                        toastr.error('O módulo informado já está cadastrado');
                    } else {
                        toastr.success('Módulo atualizado com sucesso!');
                        $scope.close();
                    }
                });
            }
        };

        /*
         Fecha o modal em modo de cancelamento
         */
        $scope.cancel = function(){
            $uibModalInstance.dismiss();
        };

        $scope.close = function(){
            $uibModalInstance.close();
        };

    }

}());