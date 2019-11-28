(function()
{
    /**
     * Diretiva wrapper para fix do holderjs no angular.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('singular.ui').directive(
        'holderFix',
        [
            Directive
        ]
    );

    /**
     * Função de definição da diretiva.
     *
     * @returns {{link: link}}
     */
    function Directive() {
        return {
            link: function ($scope, $element, $attrs) {
                Holder.run({ images: $element[0], nocss: true });
            }
        };
    }


}());