(function()
{
    'use strict';

    /**
     * Controlador responsável pela modal criação de um novo perfil.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.permissao').controller(
        'permissao.ModalEditCtrl',
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
     * @param $modalInstance
     * @param toastr
     * @param $sngApi
     * @param record
     * @constructor
     */
    function Controller(
         $scope
        ,$modalInstance
        ,toastr
        ,$sngApi
        ,record
    ) {
        /**
         * Api de comunicação com o controlador perfil acesso.
         *
         * @type {$sngApi}
         */
        $scope.perfilApi = $sngApi('sessao/perfil_acesso');

        /**
         * Vincula o registro ao escopo local.
         *
         * @type {object}
         */
        $scope.perfil = record;

        /**
         * Salva o registro do novo usuário.
         */
        $scope.save = function() {
            // marca que o formulário já foi submetido
            $scope.isSubmited = true;

            // se o formulário é valido
            if (!$scope.forms.perfil.$invalid) {
                $scope.isSaving = true;

                $scope.perfilApi.save($scope.perfil).then(function(response) {
                    $scope.isSaving = false;

                    if (!response.success) {
                        toastr.error('O perfil informado já está cadastrado');
                    } else {
                        toastr.success('Perfil alterado com sucesso!');
                        $scope.close();
                    }
                });
            } else {
                toastr.error('Verifique o preenchimento dos campos destacados');
            }
        };

        /*
         Fecha o modal em modo de cancelamento
         */
        $scope.cancel = function(){
            $modalInstance.dismiss();
        };

        $scope.close = function(){
            $modalInstance.close($scope.perfil);
        };

    }

}());