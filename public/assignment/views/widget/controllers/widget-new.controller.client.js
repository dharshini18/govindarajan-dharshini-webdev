/**
 * Created by Dharshini on 5/27/2017.
 */
(function (){
    angular
        .module('WAM')
        .controller('widgetNewController',widgetNewController);

    function widgetNewController($location,$routeParams,
                                  widgetService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            model.widgets =
                widgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function createWidget(pageId,widget) {
            websiteService.createWebsite(widget);
            $location.url('/user/' +model.userId+ '/website');
        }
    }
})();