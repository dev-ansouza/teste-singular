(function()
{
    /**
     * Diretiva que cria o cabeçalho de um módulo.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('singular').directive(
        'sngEmptyState',
        [
            Directive
        ]
    );

    /**
     * Função de definição da diretiva.
     *
     * @returns {Object}
     * @constructor
     */
    function Directive(
    ) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            template: '<div class="panel panel-default clearfix">' +
            '<div class="wrapper-md row"></div>' +
            '<div class="col-sm-12 text-center m-b-lg" ng-transclude>' +
            '</div>' +
            '</div>',
            link: function(scope,element,attrs,ctrl, transclude){
            }
        }
    }
}());

