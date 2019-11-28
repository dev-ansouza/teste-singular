(function()
{
    'use strict';

    /**
     * Controlador responsável por funcionalidade da aplicação.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.usuario').controller(
        'usuario.EditCtrl',
        [
            '$scope',
            '$state',
            '$stateParams',
            'toastr',
            'usuario.UsuarioService',
            Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $state
     * @param $stateParams
     * @param toastr
     * @param UsuarioService
     * @constructor
     */
    function Controller(
        $scope,
        $state,
        $stateParams,
        toastr,
        UsuarioService
    ) {
        /**
         * Define que o formulário está em processo de edição.
         *
         * @type {string}
         */
        $scope.viewState = 'edit';

        /**
         * Ainda não possui o registro ao abrir a tela.
         *
         * @type {boolean}
         */
        $scope.hasRecord = false;

        /**
         * Formulários da view de usuário.
         *
         * @type {object}
         */
        $scope.forms = {
            cadastro: {}
        };

        /**
         * Referência ao serviço de usuário.
         *
         * @type {usuario.UsuarioService}
         */
        $scope.usuario = UsuarioService;

        /**
         * Função que inicializa o controlador.
         */
        $scope.onInit = function() {
            // carrega o registro do usuário para ser editado
            $scope.usuario.api.get($stateParams.id).then(function(record) {

                if (record) {
                    $scope.hasRecord = true;
                }
                $scope.record = record;
            });

            loadPerfil();
        };


        /**
         * Função executada após o upload do avatar ter sido realizado.
         *
         * @param {object} response
         */
        $scope.onAvatarUpload = function(response) {
            $scope.record.avatar = response.data;
        };

        /**
         * Salva o registro do novo usuário.
         */
        $scope.save = function() {
            // marca que o formulário já foi submetido
            $scope.isSubmited = true;

            if (!$scope.forms.cadastro.$invalid) {
                $scope.isSaving = true;
                $scope.usuario.api.save($scope.record).then(function(response){
                    $scope.isSaving = false;

                    if (!response.success) {
                        toastr.error('O login informado já está cadastrado');
                    } else {
                        toastr.success('Usuário alterado com sucesso!');
                        $state.go('app.usuario-list');
                    }
                });
            }
        };

        /**
         * Carrega a lista de perfis de usuário.
         */
        function loadPerfil(){
            $scope.usuario.perfil.find().then(function(results){
                $scope.listaPerfil = results;
            })
        }

        $scope.onInit();

    }

}());