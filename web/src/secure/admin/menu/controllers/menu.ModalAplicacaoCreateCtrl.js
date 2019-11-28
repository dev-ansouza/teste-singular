(function()
{
    'use strict';

    /**
     * Controlador responsável pela modal criação de uma nova aplicação.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.menu').controller(
        'menu.ModalAplicacaoCreateCtrl',
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
         * Api de comunicação com o controlador de aplicação de acesso no backend.
         *
         * @type {$sngApi}
         */
        $scope.aplicacaoApi = $sngApi('sessao/aplicacao');

        /**
         * Objeto da aplicação.
         *
         * @type {object}
         */
        $scope.aplicacao = {
            ativo: '1'
        };

        /**
         * Define o status do modal de criação de aplicação.
         *
         * @type {string}
         */
        $scope.viewState = 'create';

        /**
         * Salva o registro da nova aplicação.
         */
        $scope.save = function() {
            // marca que o formulário já foi submetido
            $scope.isSubmited = true;

            if (!$scope.forms.aplicacao.$invalid) {
                $scope.isSaving = true;
                $scope.aplicacaoApi.save($scope.aplicacao).then(function(response){
                    $scope.isSaving = false;

                    if (!response.success) {
                        toastr.error('A aplicação informada já está cadastrada');
                    } else {
                        toastr.success('Aplicação criada com sucesso!');
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