(function()
{
    'use strict';

    /**
     * Controlador principal da aplicação.
     *
     * @author Otávio Fernandes <otavio@neton.com.br>
     */
    angular.module('singular.ui').controller(
        'ui.AppCtrl',
        [
            '$scope'
            ,'$localStorage'
            ,'$window'
            ,'UI'
            ,'ui.Filter'
            ,AppCtrl
        ]
    );

    /**
     * Controlador principal da interface de usuário da aplicação.
     *
     * @param $scope
     * @param $localStorage
     * @param $window
     * @constructor
     */
    function AppCtrl(
        $scope
        ,$localStorage
        ,$window
        ,UI
        ,UIFilter
    ) {
        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

        /**
         * Serviço de filtro.
         */
        $scope.Filter = UIFilter;

        // config
        $scope.app = {
            name: UI.appName,
            version: UI.appVersion,
            settings: {
                navbarHeaderColor: UI.navbarHeaderColor,
                navbarCollapseColor: UI.headerColor,
                asideColor: UI.navbarColor,
                headerFixed: UI.headerFixed,
                asideFixed: UI.asideFixed,
                asideFolded: UI.asideFolded,
                asideDock: UI.asideDock,
                container: UI.container,
                titleBarColor: UI.titleBarColor,
                primaryButtonColor: UI.primaryButtonColor,
                secondaryButtonColor: UI.secondaryButtonColor,
                showFilterModule: UI.showFilterModule,
                asideCollapsible: UI.asideCollapsible,
                isFilterVisible: false
            }
        };

        // save settings to local storage
        if ( angular.isDefined($localStorage.settings) ) {
            // $scope.app.settings = $localStorage.settings;
        } else {
            // $localStorage.settings = $scope.app.settings;
        }

        $scope.$watch('app.settings', function(){
            if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
                // aside dock and fixed must set the header fixed.
                $scope.app.settings.headerFixed = true;
            }
            // save to local storage
            // $localStorage.settings = $scope.app.settings;
        }, true);

        function isSmartDevice( $window )
        {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

    }

}());