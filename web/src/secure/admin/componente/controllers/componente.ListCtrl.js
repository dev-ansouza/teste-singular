(function()
{
    'use strict';

    /**
     * Controlador responsável pelo gerenciamento de componentes de interface.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.componente').controller(
        'componente.ComponenteCtrl',
        [
            '$scope'
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
     * @param SweetAlert
     * @param toastr
     * @param $sngApi
     * @constructor
     */
    function Controller(
        $scope
        ,SweetAlert
        ,toastr
        ,$sngApi
    ) {
        /**
         * Api de comunicação com o controlador de componente no backend.
         *
         * @type {$sngApi}
         */
        $scope.componenteApi = $sngApi('sessao/componente');

        /**
         * Api de comunicação com o controlador de menu no backend.
         *
         * @type {$sngApi}
         */
        $scope.menuApi = $sngApi('sessao/menu');

        /**
         * Objeto de definição do registro do componente em edição/criação.
         *
         * @type {object}
         */
        $scope.componente = {
            tipo: 'M'
        };

        /**
         * Objeto de definição da árvore de permissões.
         *
         * @type {Object}
         */
        $scope.vm = {
            version: 1,
            ignoreChange: false,
            newNode: {}
        };

        /**
         * Representação do formulário.
         *
         * @type {Object}
         */
        $scope.forms = {};

        /**
         * Função de inicialização do controlador.
         */
        $scope.onInit = function(){
            loadParents();
            loadMenu();

            $scope.$watch('componente.tipo', function(val) {
                if (val === 'M') {
                    $scope.componente.parent_id  = null;
                } else {
                    $scope.componente.menu_id  = null;
                }
            });
        };

        /**
         * Salva o registro de um componente.
         */
        $scope.saveComponente = function(){
            var componente = angular.copy($scope.componente);

            toastr.clear();
            $scope.isSubmited = true;

            if (!$scope.forms.componente.$invalid) {
                $scope.componenteApi.save(componente).then(function(response){
                    console.log(response);
                    toastr.clear();
                    if (response.success) {
                        toastr.success('Componente definido com sucesso!');

                        // carrega a lista de
                        loadParents();

                        $scope.isSubmited = false;
                        $scope.forms.componente.$setUntouched();

                        $scope.componente = {};
                        $scope.componente.tipo = "M";

                    } else {
                        toastr.error('Falhou ao tentar definir o registro!');
                    }
                });
            } else {
                toastr.error('Verifique o preenchimento dos campos destacados!');
            }
        };

        /**
         * Seleciona um nó na árvore.
         *
         * @param node
         * @param selected
         */
        $scope.vm.selectNode = function(node, selected) {
            $scope.componente = angular.copy(selected.node.original);
        };

        /**
         * Reseta o formulario de componentes.
         */
        $scope.novoComponente = function(){
            $scope.isSubmited = false;
            $scope.componente = {};
            $scope.componente.tipo = "M";

        };

        /**
         * Remove o registro de um componente.
         */
        $scope.removeComponente = function() {
            var msg = 'Deseja realmente remover este componente?';

            if ($scope.componente.tipo === 'M') {
                msg = 'Deseja realmente remover este módulo? Os componentes dependentes serão removidos juntos com ele!';
            }

            SweetAlert.swal({
                    title: "Remover",
                    text: msg,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Sim",
                    cancelButtonText: 'Não',
                    closeOnConfirm: true
                },
                function (confirm) {
                    if (confirm) {
                        $scope.componenteApi.call('removeComponente',$scope.componente).then(function(response){
                            if (response.success) {
                                loadParents();

                                $scope.componente = {};
                                $scope.componente.tipo  = 'M';
                            } else {
                                toastr.error('Não é possível excluir o registro informado!');
                            }
                        });
                    }
                });
        };

        /**
         * Carrega a lista de componentes.
         */
        function loadComponentes(){
            $scope.componenteApi.find('t.text').then(function(results){
                $scope.componentes = results;

                if (results.length > 0 ) {
                    $scope.vm.originalData = results;

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
                    version : $scope.vm.version++,
                    plugins : ['type','changed','json_data','ui']
                };

            });
        }

        /**
         * Carrega a lista de componentes pais.
         */
        function loadParents() {
            $scope.componenteApi.filter({tipo: 'M'}).find('t.text').then(function(results){
                $scope.parents = results;
                loadComponentes();
            });
        }

        /**
         * Carrega a lista de menus.
         */
        function loadMenu(){
            $scope.menuApi.find('t.modulo').then(function(results){
                $scope.menus = results;
            });
        }

        // inicializa o controlador
        $scope.onInit();
    }

}());