/**
 * Created by Dharshini on 6/8/2017.
 */
(function () {
    angular
        .module('WAM')
        .directive('wdDraggable',wdDraggable);

    function wdDraggable() {
        
        function linkFunction(scope, element) {
            $(element).sortable();
        }
        return{
            link: linkFunction
        }
    }
})();
