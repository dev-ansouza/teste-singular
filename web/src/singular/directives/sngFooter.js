(function()
{
    /**
     * Diretiva que cria o rodapé de um módulo.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('singular').directive(
        'sngFooter',
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
            template: '<div class="wrapper-sm bg-light lter b-t clearfix" ng-transclude></div>',
            link: function(scope,element,attrs,ctrl, transclude){
            }
        }
    }
}());

