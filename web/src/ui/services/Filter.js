(function()
{
   'use strict';

    /**
     * Serviço responsável por disponibilizar funções de filtro.
     *
     * @author Otávio Fernandes <otavio@neton.com.br>
     */
    angular.module('singular.ui').factory(
        'ui.Filter',
        [
            'UI',
            Service
        ]
    );

    function Service(
        UI
    ) {
        var me = this;

        /**
         * URL do template do filtro.
         *
         * @type {string}
         */
        me.templateUrl = '';

        /**
         * Se o componente de filtro está visível ou não.
         *
         * @type {boolean}
         */
        me.isVisible = false;

        /**
         * Função de aplicação do filtro.
         *
         * @type {function}
         */
        me.applyFilter = function(){};

        /**
         * Função executada quando o filtro é aberto.
         *
         * @type {function}
         */
        me.onOpen = function(){};

        /**
         * Função de reset do filtro.
         *
         * @type {function}
         */
        me.clearFilter = function(){};

        /**
         * Abre o componente de filtro.
         */
        me.open = function() {
            me.isVisible = true;
            me.onOpen();
        };

        /**
         * Fecha o componente de filtro.
         */
        me.close = function() {
            me.isVisible = false;
        };

        return me;
    }

}());