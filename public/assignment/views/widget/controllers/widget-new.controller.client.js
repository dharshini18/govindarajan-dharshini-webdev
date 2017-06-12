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
                widgetService
                    .findAllWidgetsForPage(model.pageId)
                    .then(renderWidgets);
        }
        init();

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        function createWidget(widget, type) {
            console.log(type);
            console.log(widget);
            widget.type = type;
            return widgetService
                .createWidget(model.pageId, widget)
                .then(function () {
                    $location.url('/user/' +model.userId+ '/website/' +model.websiteId+ '/page/' +model.pageId+ '/widget');
                },function () {
                    model.error = "The widget could not be created";
                });
        }
    }
})();