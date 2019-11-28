(function()
{
    /**
     * Diretiva que cria uma página de módulo.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('singular').directive(
        'sngPage',
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
            template: '<div class="col lter b-l"><div class="vbox" ng-transclude></div></div>',
            link: function(scope,element,attrs,ctrl, transclude){
                element.addClass('hbox hbox-auto-xs');
            }
        }
    }
}());

