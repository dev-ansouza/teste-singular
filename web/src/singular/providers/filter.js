(function()
{
    'use strict';

    /**
     * Provedor do serviço de filtro para o Singular.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('singular').provider('$sngFilter', FilterProvider);

    /**
     * Função de definição do filtro.
     *
     * @constructor
     */
    function FilterProvider(){
        var provider = this,
            forEach = angular.forEach;

        this.$get = ['$aside',function($aside) {
            function filterFactory(rawFilter, map) {
                var modalTpl = null,
                    listeners = [],
                    asideInstance;

                var FilterInstance = {
                    /**
                     * Define que a instância do filtro é um provedor de serviços.
                     *
                     * @type {boolean}
                     */
                    isFilterProvider: true,

                    /**
                     * Função que recupera o filtro processado a ser enviado para o backend.
                     *
                     * @type {function}
                     */
                    getFilter: getFilterFn,

                    /**
                     * Função que abre o formulário de filtro, caso ele exista.
                     *
                     * @type {function}
                     */
                    open: openFilterFn,

                    /**
                     * Função que fecha o formulário de filtro, caso ele exista.
                     *
                     * @type {function}
                     */
                    close: closeFilterFn,

                    /**
                     * Função que verifica se um filtro existe.
                     *
                     * @type {function}
                     *
                     * @return {boolean}
                     */
                    hasFilter: hasFilterFn,

                    /**
                     * Função que adiciona um filtro a ser processado pelo backend.
                     *
                     * @type {function}
                     *
                     * @param {string} filter O nome do filtro
                     * @param {any}  value  O valor do filtro
                     */
                    addFilter: addFilterFn,

                    /**
                     * Função que adiciona um listener de evento ao filtro.
                     *
                     * @type {function}
                     *
                     * @param {string}   event    O nome do evento
                     * @param {function} callback A função de callback a ser executada
                     * @events {
                     *      'clear': Acionado quando o botão Limpar filtro é clicado
                     *      'apply': Acionado quando o botão de aplicar é clicado
                     *      'open': Acionado quando o formulário do filtro é aberto
                     * }
                     */
                    $on: onFn
                };

                // tratamento do filtro não definido
                rawFilter = (typeof rawFilter !== 'undefined') ? rawFilter : {};

                if (typeof rawFilter === 'string') {
                    modalTpl = rawFilter;
                    rawFilter = {};
                }

                // tratamento do mapa não definido
                map = (typeof map !== 'undefined') ? map : {};

                return FilterInstance;

                /**
                 * Registra um listener para um tipo de evento.
                 *
                 * @param name
                 * @param callback
                 */
                function onFn(event, callback) {

                    if (!listeners[event]) {
                        listeners[event] =  [];
                    }

                    listeners[event].push(callback)
                }

                /**
                 * Aciona o evento
                 * @param event
                 * @param params
                 */
                function fire(event, params) {
                    if (!listeners[event]) {
                        listeners[event] =  [];
                    }

                    forEach(listeners[event], function(listener){
                        listener(params);
                    })
                }

                /**
                 * Função que verifica se existe um filtro definido.
                 *
                 * @returns {boolean}
                 */
                function hasFilterFn() {
                    return JSON.stringify(rawFilter) !== JSON.stringify({});
                }

                /**
                 * Função que abre o filtro para exibição do formulário ao usuário
                 */
                function openFilterFn(){

                    if (!modalTpl) {
                        return console.error('O template do filtro não foi definido na recuperação da instância $sngFilter()');
                    }

                    asideInstance = $aside.open({
                        templateUrl: modalTpl,
                        controller: ['$scope','$uibModalInstance', function($scope, $uibModalInstance){
                            $scope.filter = angular.copy(rawFilter);

                            $scope.clear = function(field){
                                if (!field) {
                                    $scope.filter = {};
                                    rawFilter = $scope.filter;
                                    fire('clear');
                                } else {
                                    delete $scope.filter[field];
                                    rawFilter = $scope.filter;
                                }

                            };

                            $scope.close = function(){
                                $uibModalInstance.close();
                            };

                            $scope.apply = function(){
                                rawFilter = $scope.filter;
                                fire('apply', rawFilter);
                                $uibModalInstance.close();
                            }
                        }],
                        placement: 'right',
                        size: 'sm'
                    });

                    fire('open',null);
                }

                /**
                 * Fecha a janela do filtro.
                 */
                function closeFilterFn() {
                    asideInstance.dismiss();
                }

                /**
                 * Função que seta um filtro.
                 *
                 * @param {string} filter
                 * @param {mixed} value
                 */
                function addFilterFn(filter, value) {
                    rawFilter[filter] = value;
                }

                /**
                 * Função que processa o filtro a ser aplicado numa chamada remota.
                 *
                 * @returns {Object}
                 */
                function getFilterFn() {
                    var filter = {};

                    forEach(rawFilter, function(value, key) {

                        if (!map[key]) { // o filtro não possui um mapa definido
                            return filter[key] = value;
                        }

                        if (typeof map[key] !== 'object') { // o mapa do filtro não possui um mapa definido
                            return filter[key] = instance.filterMap[key] + ':' + value;
                        }

                        if (map[key].hasOwnProperty('map')) { // o mapa possui uma função de mapeamento
                            return filter[key] = {
                                property: map[key].property,
                                clause: map[key].operation + ':' + map[key].map(value)
                            }
                        }

                        filter[key] = {
                            property: map[key].property,
                            clause: map[key].operation + ':' + value
                        }

                    });

                    return angular.equals(filter, {}) ? null : filter;
                }
            }

            return filterFactory;
        }];
    }
})();