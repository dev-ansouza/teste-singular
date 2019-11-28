(function()
{
    'use strict';

    /**
     * Controlador responsável pela modal criação de um novo pacote.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.builder').controller(
        'builder.PacoteModalCtrl',
        [
             '$scope'
            ,'$uibModalInstance'
            ,'toastr'
            ,'$sngApi'
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
     * @constructor
     */
    function Controller(
         $scope
        ,$uibModalInstance
        ,toastr
        ,$sngApi
    ) {

        /**
         * Api de comunicação com o controlador de pacote no backend.
         *
         * @type {$sngApi}
         */
        $scope.pacoteApi = $sngApi('builder/pacote');

        /**
         * Objeto do pacote.
         *
         * @type {object}
         */
        $scope.pacote = {};

        /**
         * Salva o registro do novo pacote.
         */
        $scope.createPacote = function() {
            // marca que o formulário já foi submetido
            $scope.isSubmited = true;

            if (!$scope.forms.pacote.$invalid) {
                $scope.isSaving = true;
                $scope.pacoteApi.call('create',$scope.pacote).then(function(response){
                    $scope.isSaving = false;

                    if (!response.success) {
                        toastr.error('Já existe um pacote registrado com este nome!');
                    } else {
                        toastr.success('Pacote criado com sucesso!');
                        $scope.close();
                    }
                });
            } else {
                toastr.error('Verifique o preenchimento dos campos destacados!');
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