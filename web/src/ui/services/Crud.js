(function()
{
    'use strict';

    /**
     * Serviço que fornece a api para conexão.
     *
     * @param $http
     * @param UI
     *
     * @constructor
     */
    var CrudFactory = function($http, UI)
    {
        var me = this;

        /**
         * Cria um serviço com funcionalidades de Crud Padrão.
         *
         * @param {string} pack Pacote do backend ao qual pertence o controlador.
         * @param {string} controller Controlador do backend pertencente ao pacote.
         *
         * @return {object}
         */
        me.create = function(pack, controller) {

            function getUrl(){
                return pack + '/' + controller;
            }

            var that = {
                paging: {
                    currentPage: 1,
                    pageSize: 20
                },
                filter: {
                    query: ''
                },

                find: function(){

                }
            }
        }

        return me;
    }

    angular.module('singular.ui').factory('ui.Crud', ['$http','UI', CrudFactory]);
}());