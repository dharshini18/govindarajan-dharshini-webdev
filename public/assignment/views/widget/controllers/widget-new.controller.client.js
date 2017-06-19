/**
 * Created by Dharshini on 5/27/2017.
 */
(function (){
    angular
        .module('WAM')
        .controller('widgetNewController',widgetNewController);

    function widgetNewController($location,$routeParams,
                                  widgetService, currentUser) {
        var model = this;
        model.userId = currentUser._id;
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
            if (typeof widget === 'undefined' || widget === "" || widget === null){
                model.error = "Widget Name is required for creation";
                return;
            }
            widget.type = type;
            return widgetService
                .createWidget(model.pageId, widget)
                .then(function () {
                    $location.url('/website/' +model.websiteId+ '/page/' +model.pageId+ '/widget');
                },function () {
                    model.error = "The widget could not be created";
                });
        }
    }
})();