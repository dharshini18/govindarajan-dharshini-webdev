/**
 * Created by Dharshini on 5/27/2017.
 */
(function (){
    angular
        .module('WAM')
        .controller('widgetEditController',widgetEditController);

    function widgetEditController($sce,$routeParams,
                                  widgetService,$location) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        function init() {
            model.widgets =
                widgetService.findWidgetsByPageId(model.pageId);
            model.widget = widgetService.findWidgetByWidgetId(model.widgetId);
        }
        init();

        function widgetEditUrl(widget) {
            var widgetType = widget.widgetType;
            if(widgetType === "HEADING"){

            }
            if(widgetType === "IMAGE"){

            }
            if(widgetType === "YOUTUBE"){

            }
        }
    }
})();