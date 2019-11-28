(function()
{
    /**
     * Diretiva que cria um box de área rolável.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('singular').directive(
        'sngContent',
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
            template: '<div class="cell"><div class="cell-inner" ng-transclude></div></div>',
            link: function(scope,element,attrs,ctrl, transclude){
                element.addClass('row-row');
            }
        }
    }
}());

