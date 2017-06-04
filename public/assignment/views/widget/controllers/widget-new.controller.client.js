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
        model.createWidget = createWidget;

        function init() {
            model.widgets =
                widgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function createWidget(widget,type) {
            widget.widgetType = type;
            widget.pageId = model.pageId;
            widgetService.createWidget(widget);
            $location.url('/user/' +model.userId+ '/website/' +model.websiteId+ '/page/' +model.pageId+ '/widget');
        }
    }
})();