(function()
{
    /**
     * Diretiva que cria o cabeçalho de um módulo.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('singular').directive(
        'sngHeader',
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
            template: '<div class="wrapper-sm bg-light lter b-b clearfix" ng-transclude></div>',
            link: function(scope,element,attrs,ctrl, transclude){
            }
        }
    }
}());

