(function()
{
    'use strict';

    /**
     * Controlador responsável pela tela de criação de usuários.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.usuario').controller(
        'usuario.CreateCtrl',
        [
            '$scope',
            '$state',
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
     * @param toastr
     * @param UsuarioService
     * @constructor
     */
    function Controller(
         $scope
        ,$state
        ,toastr
        ,UsuarioService
    ) {
        /**
         * Define que o formulário está em processo de criação.
         *
         * @type {boolean}
         */
        $scope.viewState = 'create';

        /**
         * Variável de validação da exibição do formulário.
         *
         * @type {boolean}
         */
        $scope.hasRecord = true;

        /**
         * Referência ao serviço de usuário.
         *
         * @type {usuario.UsuarioService}
         */
        $scope.usuario = UsuarioService;

        /**
         * Formulários da view de usuário.
         *
         * @type {object}
         */
        $scope.forms = {
            cadastro: {}
        };

        /**
         * Registro do usuário que está sendo criado.
         *
         * @type {object}
         */
        $scope.record = {
            ativo: '1'
        };

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function(){
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
                $scope.usuario.api.save($scope.record).then(function(response) {
                    $scope.isSaving = false;

                    if (!response.success) {
                        toastr.error('O login informado já está cadastrado');
                    } else {
                        toastr.success('Usuário criado com sucesso!');
                        $state.go('app.usuario-edit',{id: response.record});
                    }
                });
            } else {
                toastr.error('Verifique o preenchimento dos campos destacados!');
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